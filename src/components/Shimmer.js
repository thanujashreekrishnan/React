const Shimmer = () => {
    return (
        <div className="shimmer">
            {Array(6).fill("").map((_, index) => (
                <div className="shimmer-card" key={index}></div>
            ))}
        </div>
    );
};

export default Shimmer;