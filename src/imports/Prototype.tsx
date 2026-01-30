import svgPaths from "./svg-ozpz4tzl9o";
import clsx from "clsx";
import imgPlaceholderImage from "figma:asset/b4d0118543bc011744949ebbf871f95430182503.png";
import imgAvatar from "figma:asset/f3ea38a274560e8c652c5e56b982cf618cd67aad.png";
import imgContainer from "figma:asset/c7f618186c143e49432816f92c51b032374ff1c3.png";
import { imgGroup } from "./svg-f3k6r";

function Wrapper8({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
      <div className="content-stretch flex gap-[4px] items-center justify-center min-w-[inherit] px-[12px] py-[6px] relative w-full">{children}</div>
    </div>
  );
}
type Wrapper7Props = {
  additionalClassNames?: string;
};

function Wrapper7({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper7Props>) {
  return (
    <div className={clsx("bg-white relative rounded-[9999px] shrink-0 size-[48px]", additionalClassNames)}>
      <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] py-0 relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}
type AgendaEventItem2Props = {
  additionalClassNames?: string;
};

function AgendaEventItem2({ children, additionalClassNames = "" }: React.PropsWithChildren<AgendaEventItem2Props>) {
  return (
    <div className={clsx("min-w-[320px] relative rounded-[6px] shrink-0 w-[400px]", additionalClassNames)}>
      <div className="content-stretch flex flex-col gap-[8px] items-start min-w-[inherit] overflow-clip relative rounded-[inherit] w-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-1px] pointer-events-none rounded-[7px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Badge2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bg-white right-[16px] rounded-[8px] top-[16px]">
      <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[10px] py-[2px] relative rounded-[inherit]">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Wrapper6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function Wrapper5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function List8({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[8px] py-0 relative w-full">{children}</div>
      </div>
    </div>
  );
}

function TableBaseCell1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-0 relative size-full">{children}</div>
      </div>
    </div>
  );
}

function List7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function SidebarBaseItem9({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="min-w-[128px] relative rounded-[4px] shrink-0 w-full">
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center min-w-[inherit] p-[8px] relative w-full">{children}</div>
      </div>
    </div>
  );
}
type MainItem4Props = {
  additionalClassNames?: string;
};

function MainItem4({ children, additionalClassNames = "" }: React.PropsWithChildren<MainItem4Props>) {
  return (
    <div className={clsx("h-[32px] relative rounded-[4px] shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function Main2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex gap-[16px] items-start p-[24px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function AvatarImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAvatar} />
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start p-[10px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function LucideIconsDefault({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper5>
      <g id="Lucide Icons/Default">{children}</g>
    </Wrapper5>
  );
}

function Wrapper4({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper6>
      <g id="Lucide Icons/Default">{children}</g>
    </Wrapper6>
  );
}

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper6>
      <g id="Lucide Icons">{children}</g>
    </Wrapper6>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper6>
      <g id="Icon Leading">{children}</g>
    </Wrapper6>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper2>
      <g id="Vector">{children}</g>
    </Wrapper2>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper3>
      <g id="Vector">{children}</g>
    </Wrapper3>
  );
}

function IconButton2() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <LucideIcons6 />
    </div>
  );
}

function LucideIcons6() {
  return (
    <Wrapper6>
      <g clipPath="url(#clip0_5_14455)" id="Lucide Icons">
        <path d={svgPaths.p24ecce00} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_5_14455">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </Wrapper6>
  );
}

function IconButton1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <LucideIcons5 />
    </div>
  );
}

function LucideIcons5() {
  return (
    <Wrapper>
      <path d={svgPaths.p1917ed00} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p28db2b80} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper>
  );
}

function LucideIcons1() {
  return (
    <Wrapper>
      <path d={svgPaths.p2307c172} fill="var(--fill-0, #020617)" />
      <path d={svgPaths.p35f3d000} fill="var(--fill-0, #020617)" />
      <path d={svgPaths.p1735ba00} fill="var(--fill-0, #020617)" />
      <path d={svgPaths.p1e384980} fill="var(--fill-0, #020617)" />
      <path d={svgPaths.p35447980} fill="var(--fill-0, #020617)" />
      <path d={svgPaths.p3fa3fd00} fill="var(--fill-0, #020617)" />
      <path d={svgPaths.p2307c172} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p35f3d000} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p1735ba00} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p1e384980} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p35447980} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p3fa3fd00} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper>
  );
}

function IconTrailing() {
  return (
    <Wrapper6>
      <g id="Icon Trailing">
        <path d="M8 3.33333V12.6667" id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.33333 8H12.6667" id="Vector_2" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Wrapper6>
  );
}
type GroupTitleTextProps = {
  text: string;
};

function GroupTitleText({ text }: GroupTitleTextProps) {
  return (
    <div className="bg-[#f1f5f9] min-w-[128px] relative shrink-0 w-full">
      <div className="flex flex-row items-center min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center min-w-[inherit] px-[16px] py-[8px] relative w-full">
          <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-[rgba(51,65,85,0.7)] uppercase">{text}</p>
        </div>
      </div>
    </div>
  );
}
type TabsBaseTabItemTextProps = {
  text: string;
};

function TabsBaseTabItemText({ text }: TabsBaseTabItemTextProps) {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center min-w-[56px] pb-[14px] pt-[8px] px-[16px] relative shrink-0">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#64748b] text-[14px] text-center">{text}</p>
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[6px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Checkbox />
      <ContentText1 text="Add to Itinerary" />
    </div>
  );
}
type ContentText1Props = {
  text: string;
};

function ContentText1({ text }: ContentText1Props) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#020617] text-[14px] w-full">{text}</p>
    </div>
  );
}

function Checkbox() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="absolute bg-[#0ea5e9] border border-[#0ea5e9] border-solid left-0 rounded-[4px] size-[16px] top-0" data-name="base" />
      <LucideIcons />
    </div>
  );
}

function LucideIcons() {
  return (
    <div className="absolute left-px size-[14px] top-px">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Lucide Icons">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}
type WrapText2Props = {
  text: string;
};

function WrapText2({ text }: WrapText2Props) {
  return (
    <div className="content-stretch flex items-start px-[4px] py-0 relative shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#0ea5e9] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}

function ContainerImage() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[9999px] shrink-0 size-[40px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#f1f5f9] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover opacity-20 rounded-[9999px] size-full" src={imgContainer} />
      </div>
    </div>
  );
}
type TitleText3Props = {
  text: string;
};

function TitleText3({ text }: TitleText3Props) {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full">
      <IconLeading2 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#020617] text-[16px]">{text}</p>
    </div>
  );
}

function IconLeading2() {
  return (
    <Wrapper2>
      <path d={svgPaths.p373acc80} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper2>
  );
}
type ContainerTextProps = {
  text: string;
};

function ContainerText({ text }: ContainerTextProps) {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[9999px] shrink-0 size-[40px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[16px] text-center text-nowrap">
        <p className="leading-none">{text}</p>
      </div>
    </div>
  );
}
type TitleText2Props = {
  text: string;
};

function TitleText2({ text }: TitleText2Props) {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full">
      <IconLeading1 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#020617] text-[16px]">{text}</p>
    </div>
  );
}

function IconLeading1() {
  return (
    <Wrapper2>
      <path d={svgPaths.p3a26000} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper2>
  );
}
type ContentTextProps = {
  text: string;
};

function ContentText({ text }: ContentTextProps) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-[260px] relative shrink-0">
      <TitleText1 text="Where" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#64748b] text-[16px] text-nowrap w-full">{text}</p>
    </div>
  );
}
type TitleText1Props = {
  text: string;
};

function TitleText1({ text }: TitleText1Props) {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full">
      <IconLeading />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#020617] text-[16px]">{text}</p>
    </div>
  );
}

function IconLeading() {
  return (
    <Wrapper1>
      <path d={svgPaths.p14548f00} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
      <path d={svgPaths.p17781bc0} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper1>
  );
}
type Helper1Props = {
  text: string;
  text1: string;
};

function Helper1({ text, text1 }: Helper1Props) {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-none not-italic relative shrink-0 text-[#64748b] text-[16px] text-nowrap w-full">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">{text}</p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">{text1}</p>
    </div>
  );
}
type TitleTextProps = {
  text: string;
};

function TitleText({ text }: TitleTextProps) {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full">
      <Helper />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#020617] text-[16px]">{text}</p>
    </div>
  );
}

function Helper() {
  return (
    <Wrapper4>
      <path d={svgPaths.p1f2b7e00} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper4>
  );
}
type TopTextProps = {
  text: string;
};

function TopText({ text }: TopTextProps) {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic relative shrink-0 text-[#0ea5e9] text-[20px] text-nowrap tracking-[-0.6px]">{text}</p>
    </div>
  );
}

function Group() {
  return (
    <div style={{ maskImage: `url('${imgGroup}')` }} className="absolute inset-[0_-25%_0_-25.01%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[4.001px_0px] mask-size-[15.999px_16.001px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0002 16.0009">
        <g id="Group">
          <g id="Vector"></g>
          <path d={svgPaths.p2a714900} fill="var(--fill-0, #0067BC)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}
type WrapText1Props = {
  text: string;
};

function WrapText1({ text }: WrapText1Props) {
  return (
    <div className="content-stretch flex items-start px-[4px] py-0 relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#0ea5e9] text-[14px] text-nowrap">{text}</p>
    </div>
  );
}
type WrapTextProps = {
  text: string;
};

function WrapText({ text }: WrapTextProps) {
  return (
    <div className="content-stretch flex items-start px-[4px] py-0 relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#f8fafc] text-[14px] text-nowrap">{text}</p>
    </div>
  );
}

function Headline() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Headline">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#020617] text-[60px] text-center tracking-[-1.5px]">{`Make a Bold  Statement`}</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Content">
      <Headline />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#020617] text-[18px] text-center w-full">{`Add  a  subtitle  that  supports  your  title.  We  recommend  just  a  couple  of  sentences  to  grab  the  user’s  attention.`}</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0ea5e9] content-stretch flex gap-[4px] items-center justify-center min-w-[80px] overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <WrapText text="Button" />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex gap-[4px] items-center justify-center min-w-[80px] overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <WrapText1 text="Button" />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Actions">
      <Button />
      <Button1 />
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-[768px]" data-name="Column">
      <Content />
      <Actions />
    </div>
  );
}

function ContentBlock() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[80px] items-center left-[8px] overflow-clip px-[64px] py-[112px] top-[-890px] w-[1216px]" data-name="Content Block">
      <Column />
      <div className="h-[738px] opacity-50 relative shrink-0 w-full" data-name="Placeholder Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPlaceholderImage} />
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-center min-h-px min-w-px not-italic relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#020617] text-[48px] tracking-[-1.2px] w-full">Agenda Highlights</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#64748b] text-[16px] w-full">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `}</p>
    </div>
  );
}

function Wrap() {
  return (
    <div className="content-stretch flex items-start px-[4px] py-0 relative shrink-0" data-name="Wrap">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#f8fafc] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        View Full Agenda
      </p>
    </div>
  );
}

function LucideIcons2() {
  return (
    <Wrapper3>
      <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper3>
  );
}

function Button2() {
  return (
    <div className="bg-[#0ea5e9] content-stretch flex gap-[4px] items-center justify-center min-h-[44px] overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <Wrap />
      <LucideIcons2 />
    </div>
  );
}

function SectionTitle() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Section Title">
      <Content1 />
      <Button2 />
    </div>
  );
}

function LucideIcons3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Lucide Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Lucide Icons">
          <path d={svgPaths.p39f824c0} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 3">
      <LucideIcons3 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#020617] text-[24px] text-nowrap tracking-[-0.6px]">
        <p className="leading-[32px]">Search</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bottom-[11.5px] content-stretch flex flex-col items-start left-[41px] overflow-clip pl-0 pr-[1147.3px] py-0 top-[11.5px]" data-name="Container">
      <div className="flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#64748b] text-[14px] text-nowrap">
        <p className="leading-[normal]">Type keywords, tracks, speakers, event title or description</p>
      </div>
    </div>
  );
}

function Container1() {
  return <div className="absolute bottom-[11.5px] left-[41px] top-[11.5px] w-[1248px]" data-name="Container" />;
}

function Input() {
  return (
    <div className="bg-white h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container />
        <Container1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Svg() {
  return (
    <div className="absolute left-[12px] size-[16px] top-1/2 translate-y-[-50%]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p107a080} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 14L11.1333 11.1333" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[2]" data-name="Container">
      <Input />
      <Svg />
    </div>
  );
}

function LucideIconsDefault1() {
  return (
    <LucideIconsDefault>
      <path d={svgPaths.p3bb38a00} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
    </LucideIconsDefault>
  );
}

function ButtonMenu() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[17px] py-[9px] relative rounded-[6px] shrink-0" data-name="Button menu">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <LucideIconsDefault1 />
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#020617] text-[14px] text-center text-nowrap">
        <p className="leading-[20px]">Track</p>
      </div>
    </div>
  );
}

function LucideIcons4() {
  return (
    <Wrapper5>
      <g id="Lucide Icons">
        <g id="Vector">
          <path d={svgPaths.p26ddc800} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p35ba4680} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </Wrapper5>
  );
}

function ButtonMenu1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[17px] py-[9px] relative rounded-[6px] shrink-0" data-name="Button menu">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <LucideIcons4 />
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#020617] text-[14px] text-center text-nowrap">
        <p className="leading-[20px]">Room</p>
      </div>
    </div>
  );
}

function LucideIconsDefault2() {
  return (
    <LucideIconsDefault>
      <path d={svgPaths.p24091000} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
    </LucideIconsDefault>
  );
}

function ButtonMenu2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[17px] py-[9px] relative rounded-[6px] shrink-0" data-name="Button menu">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <LucideIconsDefault2 />
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#020617] text-[14px] text-center text-nowrap">
        <p className="leading-[20px]">Time</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-start flex flex-wrap gap-[0px_16px] items-start relative shrink-0 w-full z-[1]" data-name="Container">
      <ButtonMenu />
      <ButtonMenu1 />
      <ButtonMenu2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] isolate items-start pb-[24px] pt-0 px-[24px] relative w-full">
          <Container2 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function FilterAndSearchBlock() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] h-[201.5px] items-start px-[24px] py-[25px] relative rounded-[8px] shrink-0 w-[1312px]" data-name="Filter and search block">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Heading />
      <Container4 />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Flag() {
  return (
    <div className="absolute inset-[0_0_-0.01%_0.01%] overflow-clip" data-name="flag">
      <ClipPathGroup />
    </div>
  );
}

function Flags1X1JpJapan() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Flags / 1x1 /  JP - Japan">
      <Flag />
    </div>
  );
}

function Badge() {
  return (
    <Badge2>
      <Flags1X1JpJapan />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#020617] text-[12px] text-nowrap">Track 2</p>
    </Badge2>
  );
}

function Avatar() {
  return (
    <AvatarImage>
      <Badge />
    </AvatarImage>
  );
}

function Background() {
  return <div className="bg-[#0067bc] h-[392px] rounded-[8px] shrink-0 w-[14px]" data-name="Background" />;
}

function Content2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-[260px] relative shrink-0" data-name="Content">
      <TitleText text="When" />
      <Helper1 text="MM/DD/YYYY" text1="8:00 am - 9:00 am (EST)" />
    </div>
  );
}

function Image() {
  return (
    <div className="content-stretch flex items-center relative rounded-[6px] shrink-0" data-name="Image">
      <ContainerText text="CN" />
    </div>
  );
}

function TableBaseCell() {
  return (
    <div className="content-stretch flex gap-[12px] items-center mr-[-24px] overflow-clip px-[8px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <Image />
    </div>
  );
}

function Names() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start pl-0 pr-[24px] py-0 relative shrink-0 w-full" data-name="Names">
      {[...Array(3).keys()].map((_, i) => (
        <TableBaseCell key={i} />
      ))}
    </div>
  );
}

function Speaker() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-[260px] relative shrink-0" data-name="Speaker">
      <TitleText2 text="Speaker" />
      <Names />
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-start flex flex-wrap gap-[16px_24px] items-start relative shrink-0 w-full" data-name="Main Content">
      <Content2 />
      <ContentText text="University of Redlands - Room 15" />
      <Speaker />
    </div>
  );
}

function Image1() {
  return (
    <div className="content-stretch flex items-center relative rounded-[6px] shrink-0" data-name="Image">
      <ContainerImage />
    </div>
  );
}

function TableBaseCell2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip px-[8px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <Image1 />
    </div>
  );
}

function Image2() {
  return (
    <div className="content-stretch flex items-center mr-[-29px] relative rounded-[6px] shrink-0" data-name="Image">
      <ContainerImage />
    </div>
  );
}

function TableBaseCell3() {
  return (
    <div className="content-stretch flex items-center overflow-clip pl-[8px] pr-[37px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <Image2 />
    </div>
  );
}

function Image3() {
  return (
    <div className="content-stretch flex items-center relative rounded-[6px] shrink-0" data-name="Image">
      <ContainerImage />
    </div>
  );
}

function TableBaseCell4() {
  return (
    <div className="content-stretch flex gap-[7px] items-center overflow-clip px-[8px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <Image3 />
    </div>
  );
}

function Names1() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Names">
      <TableBaseCell2 />
      <TableBaseCell3 />
      <TableBaseCell4 />
    </div>
  );
}

function Speaker1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center min-w-[260px] relative shrink-0 w-full" data-name="Speaker">
      <TitleText3 text="Sponsored by" />
      <Names1 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <WrapText2 text="View Details" />
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-center flex flex-wrap gap-[16px] items-center justify-center relative shrink-0 w-full" data-name="Buttons">
      <Checkbox1 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <MainContent />
      <Speaker1 />
      <Button3 />
      <Buttons />
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
      <TopText text="Event title heading" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] w-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
      <Content3 />
    </div>
  );
}

function Main() {
  return (
    <Main2>
      <Background />
      <Frame />
    </Main2>
  );
}

function AgendaEventItem() {
  return (
    <AgendaEventItem2 additionalClassNames="bg-white">
      <Avatar />
      <Main />
    </AgendaEventItem2>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Flag1() {
  return (
    <div className="absolute inset-[0_0_-0.01%_0.01%] overflow-clip" data-name="flag">
      <ClipPathGroup1 />
    </div>
  );
}

function Flags1X1JpJapan1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Flags / 1x1 /  JP - Japan">
      <Flag1 />
    </div>
  );
}

function Badge1() {
  return (
    <Badge2>
      <Flags1X1JpJapan1 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#020617] text-[12px] text-nowrap">Track 2</p>
    </Badge2>
  );
}

function Avatar1() {
  return (
    <AvatarImage>
      <Badge1 />
    </AvatarImage>
  );
}

function Background1() {
  return <div className="bg-[#0067bc] h-[392px] rounded-[8px] shrink-0 w-[14px]" data-name="Background" />;
}

function Content4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-[260px] relative shrink-0" data-name="Content">
      <TitleText text="When" />
      <Helper1 text="MM/DD/YYYY" text1="8:00 am - 9:00 am (EST)" />
    </div>
  );
}

function Image4() {
  return (
    <div className="content-stretch flex items-center relative rounded-[6px] shrink-0" data-name="Image">
      <ContainerText text="CN" />
    </div>
  );
}

function TableBaseCell5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center mr-[-24px] overflow-clip px-[8px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <Image4 />
    </div>
  );
}

function Names2() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start pl-0 pr-[24px] py-0 relative shrink-0 w-full" data-name="Names">
      {[...Array(3).keys()].map((_, i) => (
        <TableBaseCell5 key={i} />
      ))}
    </div>
  );
}

function Speaker2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-[260px] relative shrink-0" data-name="Speaker">
      <TitleText2 text="Speaker" />
      <Names2 />
    </div>
  );
}

function MainContent1() {
  return (
    <div className="content-start flex flex-wrap gap-[16px_24px] items-start relative shrink-0 w-full" data-name="Main Content">
      <Content4 />
      <ContentText text="University of Redlands - Room 15" />
      <Speaker2 />
    </div>
  );
}

function Image5() {
  return (
    <div className="content-stretch flex items-center relative rounded-[6px] shrink-0" data-name="Image">
      <ContainerImage />
    </div>
  );
}

function TableBaseCell6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip px-[8px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <Image5 />
    </div>
  );
}

function Image6() {
  return (
    <div className="content-stretch flex items-center mr-[-29px] relative rounded-[6px] shrink-0" data-name="Image">
      <ContainerImage />
    </div>
  );
}

function TableBaseCell7() {
  return (
    <div className="content-stretch flex items-center overflow-clip pl-[8px] pr-[37px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <Image6 />
    </div>
  );
}

function Image7() {
  return (
    <div className="content-stretch flex items-center relative rounded-[6px] shrink-0" data-name="Image">
      <ContainerImage />
    </div>
  );
}

function TableBaseCell8() {
  return (
    <div className="content-stretch flex gap-[7px] items-center overflow-clip px-[8px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <Image7 />
    </div>
  );
}

function Names3() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Names">
      <TableBaseCell6 />
      <TableBaseCell7 />
      <TableBaseCell8 />
    </div>
  );
}

function Speaker3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center min-w-[260px] relative shrink-0 w-full" data-name="Speaker">
      <TitleText3 text="Sponsored by" />
      <Names3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <WrapText2 text="View Details" />
    </div>
  );
}

function Buttons1() {
  return (
    <div className="content-center flex flex-wrap gap-[16px] items-center justify-center relative shrink-0 w-full" data-name="Buttons">
      <Checkbox1 />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <MainContent1 />
      <Speaker3 />
      <Button4 />
      <Buttons1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
      <TopText text="Event title heading" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] w-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
      <Content5 />
    </div>
  );
}

function Main1() {
  return (
    <Main2>
      <Background1 />
      <Frame1 />
    </Main2>
  );
}

function AgendaEventItem1() {
  return (
    <AgendaEventItem2 additionalClassNames="bg-[rgba(241,245,249,0.5)]">
      <Avatar1 />
      <Main1 />
    </AgendaEventItem2>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <AgendaEventItem />
      <AgendaEventItem1 />
      <AgendaEventItem />
      <AgendaEventItem />
      <AgendaEventItem />
      <AgendaEventItem />
    </div>
  );
}

function SliderDots() {
  return (
    <div className="h-[8px] relative shrink-0 w-[88px]" data-name="Slider Dots">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 8">
        <g id="Slider Dots">
          <circle cx="4" cy="4" fill="var(--fill-0, #0EA5E9)" id="Dot" r="4" />
          <circle cx="20" cy="4" fill="var(--fill-0, #E0F2FE)" id="Dot_2" r="4" />
          <circle cx="36" cy="4" fill="var(--fill-0, #E0F2FE)" id="Dot_3" r="4" />
          <circle cx="52" cy="4" fill="var(--fill-0, #E0F2FE)" id="Dot_4" r="4" />
          <circle cx="68" cy="4" fill="var(--fill-0, #E0F2FE)" id="Dot_5" r="4" />
          <circle cx="84" cy="4" fill="var(--fill-0, #E0F2FE)" id="Dot_6" r="4" />
        </g>
      </svg>
    </div>
  );
}

function LucideIconsDefault3() {
  return (
    <Wrapper4>
      <path d={svgPaths.p2ec25500} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </Wrapper4>
  );
}

function CarouselPrevious() {
  return (
    <Wrapper7 additionalClassNames="opacity-50">
      <LucideIconsDefault3 />
    </Wrapper7>
  );
}

function LucideIcons7() {
  return (
    <Wrapper3>
      <path d={svgPaths.p3f191380} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </Wrapper3>
  );
}

function CarouselBaseButton() {
  return (
    <Wrapper7>
      <LucideIcons7 />
    </Wrapper7>
  );
}

function SliderButtons() {
  return (
    <div className="content-stretch flex gap-[15px] items-start relative shrink-0" data-name="Slider Buttons">
      <CarouselPrevious />
      <CarouselBaseButton />
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Content">
      <SliderDots />
      <SliderButtons />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full" data-name="Row">
      <Content6 />
      <Content7 />
    </div>
  );
}

function PreviewAgendaBlock() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[80px] items-start left-[8px] overflow-clip px-[64px] py-[112px] top-[364px] w-[1216px]" data-name="Preview Agenda Block">
      <SectionTitle />
      <FilterAndSearchBlock />
      <Row />
    </div>
  );
}

function LucideIconsDefault4() {
  return (
    <Wrapper4>
      <path d="M8 3.33333V12.6667" id="Vector" stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.33333 8H12.6667" id="Vector_2" stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper4>
  );
}

function Button5() {
  return (
    <div className="bg-[#0ea5e9] content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shadow-[0px_0px_0px_2px_white,0px_0px_0px_4px_#0ea5e9]" data-name="Button">
      <LucideIconsDefault4 />
      <WrapText text="Add Block" />
    </div>
  );
}

function AddBlockDivider() {
  return (
    <div className="bg-[#0ea5e9] h-[4px] relative w-[1216px]" data-name="Add Block Divider">
      <div className="absolute flex items-center justify-center left-[calc(50%-1.5px)] min-w-[80px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="flex-none scale-y-[-100%]">
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function BlockCanva() {
  return (
    <div className="absolute bg-[#e0f2fe] h-[2362px] left-[48px] top-[68px] w-[1232px]" data-name="Block Canva">
      <ContentBlock />
      <PreviewAgendaBlock />
      <div className="absolute flex h-[4px] items-center justify-center left-[8px] top-[364px] w-[1216px]">
        <div className="flex-none scale-y-[-100%]">
          <AddBlockDivider />
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="h-[36px] relative shrink-0 w-[219.995px]" data-name="logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 219.995 36">
        <g id="logo">
          <g clipPath="url(#clip0_5_14665)" id="Layer_1">
            <g id="Vector">
              <path d={svgPaths.p34291d00} fill="#2E9BEA" />
              <path d={svgPaths.padd0c00} fill="#2E9BEA" />
              <path d={svgPaths.p32d29000} fill="#2E9BEA" />
              <path d={svgPaths.p14f84900} fill="var(--fill-0, white)" />
              <path d={svgPaths.p16c0ed00} fill="var(--fill-0, white)" />
            </g>
          </g>
          <g id="Title">
            <path d={svgPaths.p3f8c3880} fill="var(--fill-0, #5C5C5C)" />
            <path d={svgPaths.p358b1200} fill="var(--fill-0, #5C5C5C)" />
            <path d={svgPaths.p1beb3d80} fill="var(--fill-0, #5C5C5C)" />
            <path d={svgPaths.p1e2fa600} fill="var(--fill-0, #5C5C5C)" />
            <path d={svgPaths.p1d724400} fill="#2E9BEA" />
            <path d={svgPaths.pffb6572} fill="#2E9BEA" />
            <path d={svgPaths.p16bd9200} fill="#2E9BEA" />
            <path d={svgPaths.p38604c00} fill="#2E9BEA" />
            <path d={svgPaths.p1a709300} fill="#2E9BEA" />
            <path d={svgPaths.pf784a40} fill="#2E9BEA" />
            <path d={svgPaths.p1ff67d90} fill="#2E9BEA" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_5_14665">
            <rect fill="white" height="36" transform="translate(8)" width="36.9987" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TabsBaseTabItem() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center min-w-[56px] pb-[14px] pt-[8px] px-[16px] relative shrink-0" data-name="Tabs Base / Tab Item">
      <div aria-hidden="true" className="absolute border-[#0ea5e9] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#020617] text-[14px] text-center">Home</p>
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Tabs">
      <div aria-hidden="true" className="absolute border-0 border-[#e2e8f0] border-solid inset-0 pointer-events-none" />
      <TabsBaseTabItem />
      <TabsBaseTabItemText text="Agenda" />
      <TabsBaseTabItemText text="Sponsors" />
      <TabsBaseTabItemText text="Hotels" />
      <TabsBaseTabItemText text="Speakers" />
    </div>
  );
}

function Pages() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start pb-0 pt-[8px] px-[8px] relative shrink-0" data-name="Pages">
      <Tabs />
    </div>
  );
}

function LeftPart() {
  return (
    <div className="basis-0 content-stretch flex gap-[24px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Left Part">
      <Logo />
      <div className="flex flex-row items-center self-stretch">
        <Pages />
      </div>
    </div>
  );
}

function LucideIcons8() {
  return (
    <Wrapper>
      <path d={svgPaths.p1917ed00} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p28db2b80} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center min-w-[80px] overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <LucideIcons8 />
      <WrapText1 text="Preview" />
    </div>
  );
}

function LucideIcons9() {
  return (
    <Wrapper3>
      <path d={svgPaths.p34bb8c00} id="Vector" stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper3>
  );
}

function Button9() {
  return (
    <div className="bg-[#0ea5e9] content-stretch flex gap-[4px] items-center justify-center min-w-[80px] overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <LucideIcons9 />
      <WrapText text="Publish" />
    </div>
  );
}

function RightPart() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Right Part">
      <Button8 />
      <Button9 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-0 px-[16px] py-[12px] top-0 w-[1280px]" data-name="Navigation">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <LeftPart />
      <RightPart />
    </div>
  );
}

function IconLeading3() {
  return (
    <Wrapper2>
      <path d={svgPaths.p22826300} id="Vector" stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper2>
  );
}

function MainItem() {
  return (
    <MainItem4 additionalClassNames="bg-[#0ea5e9] shadow-[0px_0px_0px_2px_white,0px_0px_0px_4px_#0ea5e9]">
      <IconLeading3 />
    </MainItem4>
  );
}

function SidebarBaseGroup() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Sidebar Base / Group">
      <MainItem />
    </div>
  );
}

function IconLeading4() {
  return (
    <Wrapper6>
      <g clipPath="url(#clip0_5_14662)" id="Icon Leading">
        <g id="Vector">
          <path d={svgPaths.p13a75f00} fill="#020617" />
          <path d={svgPaths.p370ed300} fill="#020617" />
          <path d={svgPaths.p266b4680} fill="#020617" />
          <path d={svgPaths.p1e291080} fill="#020617" />
          <path d={svgPaths.p13a75f00} stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p370ed300} stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p266b4680} stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1e291080} stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p120b5900} stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_5_14662">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </Wrapper6>
  );
}

function MainItem1() {
  return (
    <MainItem4>
      <IconLeading4 />
    </MainItem4>
  );
}

function SidebarBaseGroup1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Sidebar Base / Group">
      <MainItem1 />
    </div>
  );
}

function IconLeading5() {
  return (
    <Wrapper2>
      <path d={svgPaths.p1d668200} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper2>
  );
}

function MainItem2() {
  return (
    <MainItem4>
      <IconLeading5 />
    </MainItem4>
  );
}

function SidebarBaseGroup2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Sidebar Base / Group">
      <MainItem2 />
    </div>
  );
}

function IconLeading6() {
  return (
    <Wrapper1>
      <path d={svgPaths.pe9ab200} stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p28db2b80} stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper1>
  );
}

function MainItem3() {
  return (
    <MainItem4>
      <IconLeading6 />
    </MainItem4>
  );
}

function SidebarBaseGroup3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Sidebar Base / Group">
      <MainItem3 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="List">
      <SidebarBaseGroup />
      <SidebarBaseGroup1 />
      <SidebarBaseGroup2 />
      <SidebarBaseGroup3 />
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col items-start p-[8px] relative shrink-0 w-[48px]" data-name="Section">
      <List />
    </div>
  );
}

function Content8() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px overflow-x-clip overflow-y-auto relative shrink-0" data-name="Content">
      <Section />
    </div>
  );
}

function BuilderSidebarBase() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[886px] items-start left-0 top-0" data-name="Builder Sidebar Base">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Content8 />
    </div>
  );
}

function IconLeading7() {
  return (
    <Wrapper1>
      <path d={svgPaths.p18a8d900} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
      <path d={svgPaths.p2cfdb900} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
      <path d={svgPaths.p17f25d40} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper1>
  );
}

function SidebarBaseItem() {
  return (
    <SidebarBaseItem9>
      <IconLeading7 />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap">Content Block</p>
      <IconTrailing />
    </SidebarBaseItem9>
  );
}

function List1() {
  return (
    <List7>
      <SidebarBaseItem />
    </List7>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Section">
      <GroupTitleText text="Free-Form Blocks" />
      <List1 />
    </div>
  );
}

function IconLeading8() {
  return (
    <Wrapper2>
      <path d={svgPaths.p1f2b7e00} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper2>
  );
}

function SidebarBaseItem1() {
  return (
    <SidebarBaseItem9>
      <IconLeading8 />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap">Agenda</p>
      <IconTrailing />
    </SidebarBaseItem9>
  );
}

function IconLeading9() {
  return (
    <Wrapper2>
      <path d={svgPaths.p33dc7300} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper2>
  );
}

function SidebarBaseItem2() {
  return (
    <SidebarBaseItem9>
      <IconLeading9 />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap">Countdown</p>
      <IconTrailing />
    </SidebarBaseItem9>
  );
}

function IconLeading10() {
  return (
    <Wrapper2>
      <path d={svgPaths.p1975cc00} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper2>
  );
}

function SidebarBaseItem3() {
  return (
    <SidebarBaseItem9>
      <IconLeading10 />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap">Documents</p>
      <IconTrailing />
    </SidebarBaseItem9>
  );
}

function IconLeading11() {
  return (
    <Wrapper2>
      <path d={svgPaths.p3a26000} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper2>
  );
}

function SidebarBaseItem4() {
  return (
    <SidebarBaseItem9>
      <IconLeading11 />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap">Speakers</p>
      <IconTrailing />
    </SidebarBaseItem9>
  );
}

function IconLeading12() {
  return (
    <Wrapper2>
      <path d={svgPaths.p373acc80} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper2>
  );
}

function SidebarBaseItem5() {
  return (
    <SidebarBaseItem9>
      <IconLeading12 />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap">Sponsors</p>
      <IconTrailing />
    </SidebarBaseItem9>
  );
}

function IconLeading13() {
  return (
    <Wrapper2>
      <path d={svgPaths.p5f4cc00} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper2>
  );
}

function SidebarBaseItem6() {
  return (
    <SidebarBaseItem9>
      <IconLeading13 />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap">Booth Map</p>
      <IconTrailing />
    </SidebarBaseItem9>
  );
}

function IconLeading14() {
  return (
    <Wrapper1>
      <path d={svgPaths.p14548f00} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
      <path d={svgPaths.p17781bc0} stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper1>
  );
}

function SidebarBaseItem7() {
  return (
    <SidebarBaseItem9>
      <IconLeading14 />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap">Venue</p>
      <IconTrailing />
    </SidebarBaseItem9>
  );
}

function IconLeading15() {
  return (
    <Wrapper2>
      <path d={svgPaths.p256c0480} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
    </Wrapper2>
  );
}

function SidebarBaseItem8() {
  return (
    <SidebarBaseItem9>
      <IconLeading15 />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap">Accommodations</p>
      <IconTrailing />
    </SidebarBaseItem9>
  );
}

function List2() {
  return (
    <List7>
      <SidebarBaseItem1 />
      <SidebarBaseItem2 />
      <SidebarBaseItem3 />
      <SidebarBaseItem4 />
      <SidebarBaseItem5 />
      <SidebarBaseItem6 />
      <SidebarBaseItem7 />
      <SidebarBaseItem8 />
    </List7>
  );
}

function Section2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Section">
      <GroupTitleText text="Data-Display Blocks" />
      <List2 />
    </div>
  );
}

function Content9() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px overflow-x-clip overflow-y-auto relative shrink-0 w-full" data-name="Content">
      <Section1 />
      <Section2 />
    </div>
  );
}

function Blocks() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[781px] items-start left-[48px] top-0 w-[320px]" data-name="Blocks">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
      <Content9 />
    </div>
  );
}

function BuilderSidebarFull() {
  return (
    <div className="absolute h-[710px] left-0 top-[68px] w-[48px]" data-name="Builder Sidebar Full">
      <BuilderSidebarBase />
      <Blocks />
    </div>
  );
}

function TabsBaseTabItem1() {
  return (
    <div className="basis-0 bg-[#f1f5f9] grow min-h-px min-w-[56px] relative rounded-[6px] shrink-0" data-name="Tabs Base / Tab Item">
      <Wrapper8>
        <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#64748b] text-[14px] text-center">Block</p>
      </Wrapper8>
    </div>
  );
}

function TabsBaseTabItem2() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-[56px] relative rounded-[6px] shrink-0" data-name="Tabs Base / Tab Item">
      <div aria-hidden="true" className="absolute border border-[rgba(241,245,249,0.4)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Wrapper8>
        <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#020617] text-[14px] text-center">Page</p>
      </Wrapper8>
    </div>
  );
}

function Tabs1() {
  return (
    <div className="bg-[#f1f5f9] relative shrink-0 w-full" data-name="Tabs">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex items-start p-[6px] relative w-full">
          <TabsBaseTabItem1 />
          <TabsBaseTabItem2 />
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start not-italic relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none min-w-full relative shrink-0 text-[#020617] text-[18px] tracking-[-0.45px] w-[min-content]">Home Page</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[#64748b] text-[14px] w-[min-content]">4 Blocks</p>
    </div>
  );
}

function CardBaseHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="Card Base / Header">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-[24px] relative w-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function IconButton() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center relative rounded-[6px] shrink-0" data-name="Icon Button">
      <LucideIcons1 />
    </div>
  );
}

function TableBaseCell9() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[8px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton />
    </div>
  );
}

function LucideIcons10() {
  return (
    <Wrapper>
      <path d={svgPaths.p118e9580} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p15fb5e00} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p17f25d40} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper>
  );
}

function TableBaseCell10() {
  return (
    <TableBaseCell1>
      <LucideIcons10 />
      <p className="[text-underline-position:from-font] basis-0 decoration-solid font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap underline">Header</p>
    </TableBaseCell1>
  );
}

function TableBaseCell11() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[2px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton1 />
    </div>
  );
}

function TableBaseCell12() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[2px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton2 />
    </div>
  );
}

function Action() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="action">
      <TableBaseCell11 />
      <TableBaseCell12 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableBaseCell9 />
      <TableBaseCell10 />
      <Action />
    </div>
  );
}

function List3() {
  return (
    <List8>
      <Row1 />
    </List8>
  );
}

function IconButton3() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center relative rounded-[6px] shrink-0" data-name="Icon Button">
      <LucideIcons1 />
    </div>
  );
}

function TableBaseCell13() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[8px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton3 />
    </div>
  );
}

function LucideIcons11() {
  return (
    <Wrapper3>
      <path d={svgPaths.p256c0480} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper3>
  );
}

function TableBaseCell14() {
  return (
    <TableBaseCell1>
      <LucideIcons11 />
      <p className="[text-underline-position:from-font] basis-0 decoration-solid font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap underline">Accomodations</p>
    </TableBaseCell1>
  );
}

function TableBaseCell15() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[2px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton1 />
    </div>
  );
}

function TableBaseCell16() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[2px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton2 />
    </div>
  );
}

function Action1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="action">
      <TableBaseCell15 />
      <TableBaseCell16 />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableBaseCell13 />
      <TableBaseCell14 />
      <Action1 />
    </div>
  );
}

function List4() {
  return (
    <List8>
      <Row2 />
    </List8>
  );
}

function IconButton4() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center relative rounded-[6px] shrink-0" data-name="Icon Button">
      <LucideIcons1 />
    </div>
  );
}

function TableBaseCell17() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[8px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton4 />
    </div>
  );
}

function TableBaseCell18() {
  return (
    <TableBaseCell1>
      <Helper />
      <p className="[text-underline-position:from-font] basis-0 decoration-solid font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap underline">Agenda</p>
    </TableBaseCell1>
  );
}

function TableBaseCell19() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[2px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton1 />
    </div>
  );
}

function TableBaseCell20() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[2px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton2 />
    </div>
  );
}

function Action2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="action">
      <TableBaseCell19 />
      <TableBaseCell20 />
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableBaseCell17 />
      <TableBaseCell18 />
      <Action2 />
    </div>
  );
}

function List5() {
  return (
    <List8>
      <Row3 />
    </List8>
  );
}

function IconButton5() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center relative rounded-[6px] shrink-0" data-name="Icon Button">
      <LucideIcons1 />
    </div>
  );
}

function TableBaseCell21() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[8px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton5 />
    </div>
  );
}

function LucideIcons12() {
  return (
    <Wrapper3>
      <path d={svgPaths.p373acc80} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper3>
  );
}

function TableBaseCell22() {
  return (
    <TableBaseCell1>
      <LucideIcons12 />
      <p className="[text-underline-position:from-font] basis-0 decoration-solid font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#020617] text-[14px] text-nowrap underline">Sponsors</p>
    </TableBaseCell1>
  );
}

function TableBaseCell23() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[2px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton1 />
    </div>
  );
}

function TableBaseCell24() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip px-[2px] py-0 relative shrink-0" data-name="Table Base / Cell">
      <IconButton2 />
    </div>
  );
}

function Action3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="action">
      <TableBaseCell23 />
      <TableBaseCell24 />
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableBaseCell21 />
      <TableBaseCell22 />
      <Action3 />
    </div>
  );
}

function List6() {
  return (
    <List8>
      <Row4 />
    </List8>
  );
}

function LucideIconsDefault5() {
  return (
    <Wrapper4>
      <path d="M8 3.33333V12.6667" id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.33333 8H12.6667" id="Vector_2" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper4>
  );
}

function Button6() {
  return (
    <div className="bg-[#f1f5f9] min-w-[80px] relative rounded-[6px] shrink-0 w-full" data-name="Button 01">
      <div className="flex flex-row items-center justify-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center min-w-[inherit] px-[12px] py-[8px] relative w-full">
          <LucideIconsDefault5 />
          <WrapText1 text="Add Block" />
        </div>
      </div>
    </div>
  );
}

function PageOrg() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full" data-name="Page Org">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-[20px] pt-[8px] px-[8px] relative size-full">
          <List3 />
          <List4 />
          <List5 />
          <List6 />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function LucideIcons13() {
  return (
    <Wrapper>
      <path d={svgPaths.pe9ab200} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p28db2b80} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper>
  );
}

function Wrap1() {
  return (
    <div className="content-stretch flex items-start px-[4px] py-0 relative shrink-0" data-name="Wrap">
      <p className="[text-underline-position:from-font] decoration-solid font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#020617] text-[14px] text-nowrap underline">Page Settings</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center min-w-[80px] overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button 02">
      <LucideIcons13 />
      <Wrap1 />
    </div>
  );
}

function CardBaseFooter() {
  return (
    <div className="relative shrink-0 w-full" data-name="Card Base / Footer">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[24px] pt-0 px-[24px] relative w-full">
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Wrap2() {
  return (
    <div className="content-stretch flex items-start px-[4px] py-0 relative shrink-0" data-name="Wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#dc2626] text-[14px] text-nowrap">Delete Page</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[rgba(220,38,38,0.1)] content-stretch flex gap-[4px] items-center justify-center min-w-[80px] overflow-clip px-[12px] py-[8px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Button 01">
      <Wrap2 />
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#0f172a] content-stretch flex gap-[4px] items-center justify-center min-w-[80px] overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button 02">
      <WrapText text="Close" />
    </div>
  );
}

function Footer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Footer">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[24px] pt-0 px-[24px] relative w-full">
          <Button10 />
          <Button11 />
        </div>
      </div>
    </div>
  );
}

function Footer1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[1px_0px_0px] border-solid inset-0 pointer-events-none shadow-[0px_-1px_3px_0px_rgba(0,0,0,0.1),0px_-1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <CardBaseFooter />
      <Footer />
    </div>
  );
}

function PropsPanel() {
  return (
    <div className="absolute bg-white h-[756px] left-[1014px] max-w-[384px] rounded-[4px] top-[76px] w-[258px]" data-name="Props Panel">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] overflow-clip relative rounded-[inherit] size-full">
        <Tabs1 />
        <CardBaseHeader />
        <PageOrg />
        <Footer1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function PointingHandIcon() {
  return (
    <div className="absolute inset-[19.79%_22.59%_19.79%_22.6%]" data-name="Pointing hand icon">
      <div className="absolute inset-[-8.28%_-9.12%_-15.17%_-16.72%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0722 23.8667">
          <g id="Pointing hand icon">
            <g filter="url(#filter0_d_5_14497)" id="Vector">
              <path d={svgPaths.p177abb80} fill="white" />
              <path d={svgPaths.p177abb80} stroke="var(--stroke-0, black)" strokeWidth="0.8" />
            </g>
            <line id="Line" stroke="var(--stroke-0, black)" strokeWidth="0.8" x1="11.4867" x2="11.4867" y1="12.744" y2="17.8752" />
            <line id="Line_2" stroke="var(--stroke-0, black)" strokeWidth="0.8" x1="14.1185" x2="14.1185" y1="12.744" y2="17.8752" />
            <line id="Line_3" stroke="var(--stroke-0, black)" strokeWidth="0.8" x1="16.8148" x2="16.8148" y1="12.744" y2="17.8752" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="23.8667" id="filter0_d_5_14497" width="22.0722" x="-8.9407e-08" y="1.19209e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-0.666667" dy="0.666667" />
              <feGaussianBlur stdDeviation="0.933333" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_5_14497" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_5_14497" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function CursorHand() {
  return (
    <div className="absolute left-[568px] overflow-clip size-[32px] top-[424px]" data-name="Cursor / Hand">
      <PointingHandIcon />
    </div>
  );
}

export default function Prototype() {
  return (
    <div className="bg-[#f1f5f9] relative size-full" data-name="Prototype">
      <BlockCanva />
      <Navigation />
      <BuilderSidebarFull />
      <PropsPanel />
      <CursorHand />
    </div>
  );
}