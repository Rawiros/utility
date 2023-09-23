export default (namespace?: string) => {
    const Id = Math.random().toString(36).slice(2);

    if (namespace)
        return `${namespace}:${Id.slice(4)}`;

    return Id;
};