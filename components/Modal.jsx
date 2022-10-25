export const Modal = ({ isOpen, children }) => {
  const addTodoModalClass = isOpen ? "modal modal-open" : "modal";
  return (
    <div className={addTodoModalClass}>
      <div className="modal-box">{children}</div>
    </div>
  );
};