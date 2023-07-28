export default (prefix?: string) =>  {
    const Id = Math.random().toString(36).slice(2);

    if(prefix)
        return `${prefix}:${Id.slice(4)}`;

    return Id;
};