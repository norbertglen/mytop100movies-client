import styles from "../../styles/UI/Field/Field.module.css";

const Field = (props) => {
    return (
        <div className={styles.form_control}>
            <label>{props.label}</label>
            <input
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                name={props.name}
                className={props.className}
            />
        </div>
    );
};

export default Field;
