
export default function ValidateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g
        if (!email.match(emailPattern)) {
            return false
        }
    return true;
}