declare module '*.js' {
    const content: any;
    export default content;
}

declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}