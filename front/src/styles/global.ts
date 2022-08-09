import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
   * {
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: 'Open Sans', sans-serif; 
   }
   
   #root {
       margin:0 auto;
   }

   body {
        background-color: #0079bf;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 16px;
        color: #172b4d;
   }
   
   input, textarea {
        color: #172b4d;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: .9em;        
        padding: 5px 10px;
        margin-bottom: 10px;
   }
`;
