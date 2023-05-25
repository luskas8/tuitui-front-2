import { useEffect } from 'react';
import { useModal } from '../hooks';
import { Button } from './buttons';
import { ReactComponent as Close} from '../assets/icons/Close.svg';

interface BaseModalProps {
  children: React.ReactNode;
  onClickFaceDismiss?: boolean;
}

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cancelButton?: boolean;
}

interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Modal({ children, onClickFaceDismiss = true }: BaseModalProps) {
  const { isVisible, toggleVisibility } = useModal();

  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : 'unset';
  }, [isVisible]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (onClickFaceDismiss && e.target === e.currentTarget) {
      toggleVisibility();
    }
  }

  return (
    <div onClick={handleBackdropClick} className={`modal-fade ${isVisible ? "block" : "hidden"} fixed top-0 left-0 w-full h-screen z-20 bg-slate-700 bg-opacity-40 backdrop-blur-sm flex justify-center items-center`}>
      <div className="modal-dialog bg-white rounded-md min-w-[300px] lg:min-w-[600px]">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.Header = ({ children, cancelButton = false, ...props }: ModalHeaderProps) => {
  const { toggleVisibility } = useModal();

  return (
    <header {...props} className="modal-header flex justify-between items-center border-b border-slate-100 pt-2 pb-1 px-4">
      {children}
      <Button.Default disabled={cancelButton} onClick={toggleVisibility} className='bg-slate-300 hover:bg-slate-400 text-white p-2 rounded-full'>
        <Close />
      </Button.Default>
    </header>
  );
}

Modal.Title = ({ children, ...props }: ModalTitleProps) => {
  return (
    <h5 {...props} className="modal-title font-semibold text-lg">
      {children}
    </h5>
  );
}

Modal.Body = ({ children, ...props }: ModalBodyProps) => {
  return (
    <main {...props} className="modal-body border-b border-slate-100 py-5 px-4 font-medium">
      {children}
    </main>
  );
}

Modal.Footer = ({ children, ...props }: ModalFooterProps) => {
  return (
    <footer {...props} className="modal-footer pb-2 pt-2 px-4 flex justify-end gap-2">
      {children}
    </footer>
  );
}
