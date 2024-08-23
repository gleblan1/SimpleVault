import {makeStyles} from "tss-react/mui";

export const useClasses = makeStyles()(() => ({
    container: {
      wisth: "100%",
      display: "flex", 
      justifyContent: "start", 
      alignItems: "center", 
      flexDirection: "column", 
      height: "59vh", 
      gap: 50,
      marginTop: '18vh'
    },
}));