import React, { useState, useEffect } from "react";

function ResultComponent()
{
    return (<>
    {localStorage.getItem("Score")}</>)
}

export default ResultComponent;