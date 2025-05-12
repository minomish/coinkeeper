import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction } from '../redux/transactionSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TransactionModal = ({ transaction, onClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const isEditing = !!transaction._id;

  const initialValues = {
    type: transaction.type || 'expense',
    amount: transaction.amount || '',
    category: transaction.category?._id || '',
    date: transaction.date ? new Date(transaction.date) : new Date(),
    comment: transaction.comment || '',
  };

  const validationSchema = Yup.object({
    type: Yup.string().required('Required'),
    amount: Yup.number().positive('Must be positive').required('Required'),
    category: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
  });

  const handleSubmit = (values) => {
    const transactionData = {
      ...values,
      date: values.date.toISOString(),
    };

    if (isEditing) {
      dispatch(updateTransaction({ id: transaction._id, ...transactionData }));
    } else {
      dispatch(addTransaction(transactionData));
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="form-group">
                <label>Type</label>
                <Field as="select" name="type">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Field>
              </div>
              <div className="form-group">
                <label>Amount</label>
                <Field type="number" name="amount" step="0.01" />
                <ErrorMessage name="amount" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <Field as="select" name="category">
                  <option value="">Select a category</option>
                  {categories
                    .filter((cat) => cat.type === values.type)
                    .map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage name="category" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Date</label>
                <DatePicker
                  selected={values.date}
                  onChange={(date) => setFieldValue('date', date)}
                  dateFormat="yyyy-MM-dd"
                />
                <ErrorMessage name="date" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Comment</label>
                <Field as="textarea" name="comment" />
              </div>
              <button type="submit">Save</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TransactionModal;