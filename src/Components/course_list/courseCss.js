import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({

    courseBasicDetailsRoot: {
        gap: "20px",
        display: 'flex',
        margin: "2.5rem 0px",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    courseBasicDetailsChip: {
        border: 'solid #e83e8c 1px',
        borderRadius: "1rem",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        maxWidth: "400px"
    },
    courseBasicDetailsEmptyChip: {
        border: 'solid #e83e8c 1px',
        borderRadius: "1rem",
        display: "none",
    }
});
