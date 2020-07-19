import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { LoadingOutlined, CheckCircleTwoTone } from '@ant-design/icons';

import { colors } from '../Css';
import { notification } from 'antd';
import { notificationConfigs } from '../constants/ToastNotifincation';
import { getImageUploadPercentageState } from '../redux/misc/imageUploadReducer';

const acceptedMimeTypes = ['image/png', 'image/jpeg', 'image/gif'];
const maxFileSize = 1000000;

const UploadImage = ({ onSelectImage, imageUploadKey, uploadeText }) => {
  // const [files, setFiles] = useState(null);
  const [invalidFile, setInvalidFile] = useState({
    invalid: false,
    type: '',
  });
  const imageUploadProgress = useSelector(getImageUploadPercentageState);
  const classes = useStyles({});
  const fileInputRef = useRef();
  const fileInputContainerRef = useRef();

  useEffect(() => {
    if (imageUploadProgress !== null) {
      notification['open']({
        message: `${imageUploadProgress}% uploading...`,
        key: imageUploadKey,
        icon: <LoadingOutlined style={{ color: colors.pinkDark }} />,
        ...notificationConfigs,
      });
    }
    if (imageUploadProgress === 100) {
      notification['open']({
        message: `Image uploaded sucessfully, now creating your platform`,
        key: imageUploadKey,
        style: {
          color: colors.green,
        },
        icon: <CheckCircleTwoTone style={{ color: colors.green }} />,
        ...notificationConfigs,
      });
    }
  }, [imageUploadProgress]);

  useEffect(() => {
    if (invalidFile.invalid)
      notification['error']({
        message: `Invalid File 
      ${invalidFile.type === 'format' ? 'Format' : `Size. Max Size: ${maxFileSize / 1000000}mb`}`,
        ...notificationConfigs,
      });
  }, [invalidFile]);

  function verifyFile(file) {
    if (!acceptedMimeTypes.includes(file.type)) {
      return [false, 'format'];
    }

    // if (file.size > maxFileSize) {
    //   return [false, 'size'];
    // }

    return [true];
  }

  function addFile({ target }) {
    const newFile = target.files[0];
    if (newFile) {
      const [fileValid, error] = verifyFile(newFile);
      if (fileValid) {
        // setFiles(newFile);
        onSelectImage(newFile);

        var reader = new FileReader();

        reader.onload = (function (theFile) {
          return function (e) {
            fileInputContainerRef.current.style[
              'background'
            ] = `url(${e.target.result})  no-repeat center center`;
          };
        })(newFile);

        reader.readAsDataURL(newFile);
      } else {
        setInvalidFile({
          invalid: true,
          type: error,
        });
      }
    }
  }

  return (
    <div
      ref={fileInputContainerRef}
      className={classes.btn}
      onClick={() => fileInputRef.current.click()}>
      <p style={{ textTransform: 'uppercase', color: colors.black2, marginBottom: 0 }}>
        {uploadeText || 'click to add image'}
      </p>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onInput={addFile} />
    </div>
  );
};

const useStyles = makeStyles({
  btn: {
    height: '10rem',
    width: '10rem',
    borderRadius: '50%',
    backgroundColor: colors.pinkLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '1rem',
    textAlign: 'center',
    marginBottom: 0,
    backgroundSize: '100%',
    transition: 'all .3s',
    '&:hover': {
      boxShadow: '0 5px 4px rgba(0, 0, 0, 0.05)',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
});

export default React.memo(UploadImage);
