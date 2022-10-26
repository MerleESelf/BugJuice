import PropTypes from "prop-types";
import { Formik } from "formik";
import { TodoSchema } from "./validation";

export const TodoForm = ({ handleSubmit, editTodoValues }) => {
  const todaysDate = new Date().toISOString().split("T")[0];

  const initialValues = {
    todoname: "",
    due: todaysDate,
    status: "",
    priority: ""
  };

  if (editTodoValues) {
    initialValues.todoname = editTodoValues.todoname;
    initialValues.due = editTodoValues.due;
    initialValues.status = editTodoValues.status
    initialValues.priority = editTodoValues.priority
  }
  // console.log(Formik)
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
      }) => {

        // console.log(values)
        console.log('handle sub--->', handleSubmit)
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // console.log("handleFormikSub --->", handleFormikSubmit)
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
                id="todoname"
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
                id="due"
                value={values.due}
                min={todaysDate}
                onChange={handleChange}
              />
              {Boolean(errors.due) && touched.due && errors.due}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="status">
                <span className="label-text">Status:</span>
              </label>
              <select
                className="select select-bordered"
                name="status"
                id="status"
                value={values.status}
                onChange={handleChange}
              >
                <option
                  value=""
                  label="--Set Task Status--"
                >
                  Set Task Status
                </option>
                <option
                  value="Future"
                  label="Future"
                >
                  Future
                </option>
                <option
                  value="Needs Attention"
                  label="Needs Attention"
                >
                  Needs Attention
                </option>
                <option
                  value="In Progress"
                  label="In Progress"
                >
                  In Progress
                </option>
                <option
                  value="Done"
                  label="Done"
                >
                </option>
              </select>
              {Boolean(errors.status) && touched.status && errors.status}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="priority">
                <span className="label-text">Priority:</span>
              </label>
              <select
                className="select select-bordered"
                name="priority"
                id="priority"
                value={values.priority}
                onChange={handleChange}
              >
                <option
                  value=""
                  label="--Set Task Priority--"
                >
                  Set Task Priority
                </option>
                <option
                  value="High"
                  label="High"
                >
                  High
                </option>
                <option
                  value="Moderate"
                  label="Moderate"
                >
                  Moderate
                </option>
                <option
                  value="Low"
                  label="Low"
                >
                  In Progress
                </option>
              </select>
              {Boolean(errors.priority) && touched.priority && errors.priority}
            </div>
            <button className="mt-4 btn btn-success" type="submit">
              Submit
            </button>
          </form>
        )
      }

      }
    </Formik>
  );
};

TodoForm.propTypes = {
  handleSubmit: PropTypes.func,
  editTodoValues: PropTypes.object,
};