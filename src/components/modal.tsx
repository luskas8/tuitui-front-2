import { useEffect } from 'react';
import { useModal } from '../hooks/useModal';

interface BaseModalProps {
  children: React.ReactNode;
  onClickFaceDismiss?: boolean;
}

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
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
      <div className="modal-dialog w-10 h-10 bg-white rounded-md">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.Header = ({ children, ...props }: ModalHeaderProps) => {
  return (
    <header {...props} className="modal-header">
      {children}
    </header>
  );
}

Modal.Title = ({ children, ...props }: ModalTitleProps) => {
  return (
    <h5 {...props} className="modal-title">
      {children}
    </h5>
  );
}

Modal.Body = ({ children, ...props }: ModalBodyProps) => {
  return (
    <main {...props} className="modal-body">
      {children}
    </main>
  );
}

Modal.Footer = ({ children, ...props }: ModalFooterProps) => {
  return (
    <footer {...props} className="modal-footer">
      {children}
    </footer>
  );
}
