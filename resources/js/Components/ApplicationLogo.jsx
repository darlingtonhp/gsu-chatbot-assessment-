export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/images/Logo.png"
            alt="Gwanda State University Logo"
            className={`object-contain ${props.className || ""}`}
        />
    );
}
