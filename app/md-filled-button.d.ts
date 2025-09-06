import type { MdFilledButton } from "@material/web/button/filled-button";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "md-filled-button": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & Partial<MdFilledButton>,
                HTMLElement
            >;
        }
    }
}
