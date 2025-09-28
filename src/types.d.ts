declare module "*.svg" {
  import { FunctionComponent, SVGProps } from "react";
  const ReactComponent: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}
