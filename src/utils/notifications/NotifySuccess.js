import { toast } from 'react-toastify';

const NotifySuccess = (message) => {
    return (
        toast.success(
            `${message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: ''
            }
        )
    );
}

export default NotifySuccess;