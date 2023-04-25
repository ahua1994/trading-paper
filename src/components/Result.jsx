import "./Result.scss";

const Result = ({ x }) => {
    console.log(x);
    return (
        <div className="Result">
            <p>{x["2. name"]}</p>
            <p>Symbol: {x["1. symbol"]}</p>
            <p>{x["4. region"]}</p>
            <p>{x["8. currency"]}</p>
        </div>
    );
};

export default Result;
