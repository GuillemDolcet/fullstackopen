const Notification = ({ text, success }) => {
    if (text === null || success === null) {
        return null
    }

    const className = success ? 'success' : 'error';

    return (
        <div className={className}>
            {text}
        </div>
    )
}

export default Notification