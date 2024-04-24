import { toast } from 'react-toastify';

const NotifyWarning = (message) => {
    return (
        toast.warn(
            `${message}`, {
                position: "top-center",
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

export default NotifyWarning;