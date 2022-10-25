import PropTypes from "prop-types";
import { Formik } from "formik";
import { TodoSchema } from "./validation";

export const TodoForm = ({ handleSubmit, editTodoValues }) => {
  const todaysDate = new Date().toISOString().split("T")[0];

  const initialValues = {
    todoname: "",
    due: todaysDate,
  };

  if (editTodoValues) {
    initialValues.todoname = editTodoValues.todoname;
    initialValues.due = editTodoValues.due;
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={TodoSchema}
    >
      {({
        touched,
        values,
        handleSubmit: handleFormikSubmit,
        handleChange,
        errors,
      }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormikSubmit();
          }}
        >
          <div className="form-control">
            <label className="label" htmlFor="todoname">
              <span className="label-text">Name:</span>
            </label>
            <input
              className="input input-bordered"
              type="text"
              name="todoname"
              value={values.todoname}
              onChange={handleChange}
            />
            {Boolean(errors.todoname) && touched.todoname && errors.todoname}
          </div>
          <div className="form-control">
            <label className="label" htmlFor="due">
              <span className="label-text">Due Date:</span>
            </label>
            <input
              className="input input-bordered"
              type="date"
              name="due"
              value={values.due}
              min={todaysDate}
              onChange={handleChange}
            />
            {Boolean(errors.due) && touched.due && errors.due}
          </div>
          <button className="mt-4 btn btn-success" type="submit">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

TodoForm.propTypes = {
  handleSubmit: PropTypes.func,
  editTodoValues: PropTypes.object,
};