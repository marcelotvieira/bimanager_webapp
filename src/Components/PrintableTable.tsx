import React, { ReactNode, RefObject, createRef } from 'react';
import ReactToPrint from 'react-to-print';
import '../styles/print.css';

// Props para o componente Printable
interface PrintableProps {
  trigger: () => JSX.Element;
  children: ReactNode;
}

class Printable extends React.Component<PrintableProps> {
  private contentRef: RefObject<HTMLDivElement>;

  constructor(props: PrintableProps) {
    super(props);
    this.contentRef = createRef<HTMLDivElement>();
  }

  render() {
    return (
      <div>
        <ReactToPrint
          trigger={this.props.trigger}
          content={() => this.contentRef.current}
        />
        <div ref={this.contentRef}>{this.props.children}</div>
      </div>
    );
  }
}

export default Printable;
