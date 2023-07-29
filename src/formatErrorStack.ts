export default (err: Error): string => {
    if (typeof err.stack === "string") {
        const stack = err.stack.match(/at (.*)/g) ?? [];

        if (stack)
            return stack.map(e => e.split(" ")[1]).join(" > ");
    };

    return "None";
};