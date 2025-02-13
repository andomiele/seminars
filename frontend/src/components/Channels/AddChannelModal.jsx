/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useAddChannelMutation, useGetСhannelsQuery } from '../../services/channelsApi.js';
import channelSchema from './shema.js';
import { setChannel } from '../../redux/slices/channelsSlice.js';

leoProfanity.add(leoProfanity.getDictionary('en'));
leoProfanity.add(leoProfanity.getDictionary('ru'));

const AddChannelModal = ({ uiState, hideModal }) => {
  const [addChannel, { isSuccess }] = useAddChannelMutation();
  const { data: channels = [] } = useGetСhannelsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('toasts.сhannelAdded'));
    }
  }, [isSuccess, t]);

  const handleSubmit = async (values) => {
    const channelName = leoProfanity.clean(values.name);
    await addChannel({ name: channelName })
      .then((response) => {
        dispatch(setChannel(response.data));
        hideModal();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const channelsName = channels.map((channel) => channel.name);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: channelSchema(channelsName),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{uiState.modal.data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="" onSubmit={formik.handleSubmit}>
          <div>
            <input
              name="name"
              id="name"
              placeholder=""
              className={`mb-2 form-control ${formik.errors.name ? 'is-invalid' : null}`}
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputRef}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{t(`errors.${formik.errors.name}`)}</div>
            ) : null}
            <label className="visually-hidden" htmlFor="name">{t('modal.channelName')}</label>
            <div className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={hideModal}>{uiState.modal.data.canselBtn}</button>
              <button type="submit" className="btn btn-primary">{uiState.modal.data.sentBtn}</button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </>
  );
};

export default AddChannelModal;
