import { deleteContact } from '../../redux/contacts/operations.js';
import { useDispatch } from 'react-redux';
import css from './DeleteModal.module.css';

export default function DeleteModal({ contact, handleClose }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={css.modal}>
      <p>Delete the contact {contact.name}?</p>
      <div className={css.controls}>
        <button type='button' onClick={handleDelete}>Delete</button>
        <button type='button' onClick={handleClose}>Cancel</button>
      </div>
    </div>
  )
}