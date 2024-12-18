import { html, useState, useEffect, reactive, getRef } from "z-js-framework";

export const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const genModalRef = () => {
    return `modalRef_${Date.now()}`;
  };
  const modalRef = genModalRef();

  const openModalHandler = () => {
    const modal = getRef(modalRef);
    if (!modal) return;
    setIsOpen(true);
    modal.showModal();
  };

  const closeModalHandler = () => {
    const modal = getRef(modalRef);
    if (!modal) return;
    setIsOpen(false);
    modal.close();
  };

  const closeModalOnClickBackDrop = () => {
    const modal = getRef(modalRef);
    if (!modal) return;
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModalHandler();
      }
    });
  };

  const UI = () => html`
    <div>
      <div onClick="${openModalHandler}">${props.openModalElement}</div>
      <dialog
        ref="${modalRef}"
        class="w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.0)] transition-all ml-4 mt-4
        backdrop:bg-[rgba(0,0,0,0.5)] outline-none"
      >
        <div
          class="w-full h-full flex items-center justify-center  bg-[rgba(0,0,0,0.0)]
          z-10"
        >
          <div
            class="w-auto h-auto p-4s sm: p-8 relative shadow-[0px_10px_20px_rgba(0,0,0,0.25)]
            z-50 bg-[#212529] rounded-lg"
          >
            <span onClick="${closeModalHandler}" class="absolute top-2 right-2">
              <img
                src="icons/close.svg"
                alt="Close Icon"
                class="size-7 cursor-pointer"
              />
            </span>
            <div class="z-50">${props.contentElement}</div>
          </div>
        </div>
      </dialog>
    </div>
  `;

  useEffect(() => {
    closeModalOnClickBackDrop();
  }, [isOpen]);

  return reactive(UI);
};
