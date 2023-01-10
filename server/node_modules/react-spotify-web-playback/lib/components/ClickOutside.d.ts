import * as React from 'react';
interface Props {
    onClick: () => any;
}
export default class ClickOutside extends React.PureComponent<Props> {
    private container;
    private isTouch;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleClick;
    private setRef;
    render(): JSX.Element;
}
export {};
