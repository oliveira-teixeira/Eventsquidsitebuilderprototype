import svgPaths from "./svg-5dzbf6vj45";
import imgAvatar from "figma:asset/f3ea38a274560e8c652c5e56b982cf618cd67aad.png";

function AccomodationSearchItem2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-[348px]">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function CardBaseFooter2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[64px] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[24px] pt-0 px-[24px] relative size-full">{children}</div>
      </div>
    </div>
  );
}
type CardBaseHeaderProps = {
  text: string;
  text1: string;
};

function CardBaseHeader({ children, text, text1 }: React.PropsWithChildren<CardBaseHeaderProps>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-[24px] relative w-full">
          <div className="content-stretch flex flex-col gap-[6px] items-start not-italic relative shrink-0 w-full">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none min-w-full relative shrink-0 text-[#020617] text-[24px] tracking-[-0.6px] w-[min-content]">{text}</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[#64748b] text-[14px] w-[min-content]">{text1}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1>
      <g id="Lucide Icons">{children}</g>
    </Wrapper1>
  );
}

function LucideIcons4() {
  return (
    <Wrapper>
      <path d={svgPaths.p1dd38d80} id="Vector" stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper>
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

function AvatarImage() {
  return (
    <div className="h-[242px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAvatar} />
    </div>
  );
}
type DropdownTextProps = {
  text: string;
};

function DropdownText({ text }: DropdownTextProps) {
  return (
    <div className="content-stretch flex gap-[24px] items-center px-0 py-[20px] relative shrink-0 w-full">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#020617] text-[36px] tracking-[-0.9px]">{text}</p>
      <IconChevronUp />
    </div>
  );
}

function IconChevronUp() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon / chevron-up">
          <path d={svgPaths.p39260070} fill="var(--fill-0, #020617)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0" data-name="text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#020617] text-[60px] text-nowrap tracking-[-1.5px]">Accomodations</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] min-w-full relative shrink-0 text-[#64748b] text-[16px] w-[min-content]">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `}</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Content">
      <Text />
    </div>
  );
}

function SectionTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section Title">
      <Content />
    </div>
  );
}

function LucideIcons() {
  return (
    <Wrapper1>
      <g clipPath="url(#clip0_46_6887)" id="Lucide Icons">
        <path d={svgPaths.p1672ce80} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_46_6887">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </Wrapper1>
  );
}

function Badge() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[10px] py-[2px] relative rounded-[6px] shrink-0" data-name="Badge">
      <LucideIcons />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#0f172a] text-[12px] text-nowrap">Book by March for a 15% discount</p>
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Top">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic relative shrink-0 text-[#0ea5e9] text-[20px] text-nowrap tracking-[-0.6px]">Hotel Name</p>
      <Badge />
    </div>
  );
}

function IconLeading() {
  return (
    <Wrapper1>
      <g id="Icon Leading">
        <g id="Vector">
          <path d={svgPaths.p14548f00} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
          <path d={svgPaths.p17781bc0} stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
        </g>
      </g>
    </Wrapper1>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full" data-name="Title">
      <IconLeading />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#020617] text-[16px]">Location</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-[260px] relative shrink-0" data-name="Content">
      <Title />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#64748b] text-[16px] text-nowrap w-full">123 Main St, City, Country</p>
    </div>
  );
}

function LucideIcons1() {
  return (
    <Wrapper1>
      <g clipPath="url(#clip0_46_6884)" id="Lucide Icons">
        <path d={svgPaths.p2a44c680} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_46_6884">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </Wrapper1>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full" data-name="Title">
      <LucideIcons1 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#020617] text-[16px]">Phone</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-[260px] relative shrink-0" data-name="Content">
      <Title1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#64748b] text-[16px] text-nowrap w-full">+1 234 567 8900</p>
    </div>
  );
}

function LucideIcons2() {
  return (
    <Wrapper>
      <path d={svgPaths.p2ad99780} id="Vector" stroke="var(--stroke-0, #020617)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full" data-name="Title">
      <LucideIcons2 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#020617] text-[16px]">Email</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-[260px] relative shrink-0" data-name="Content">
      <Title2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#64748b] text-[16px] text-nowrap w-full">info@grandhotel.com</p>
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-start flex flex-wrap gap-[16px_24px] items-start relative shrink-0 w-full" data-name="Main Content">
      <Content1 />
      <Content2 />
      <Content3 />
    </div>
  );
}

function Wrap() {
  return (
    <div className="content-stretch flex items-start px-[4px] py-0 relative shrink-0" data-name="Wrap">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#0ea5e9] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Visit Website
      </p>
    </div>
  );
}

function LucideIcons3() {
  return (
    <Wrapper>
      <path d={svgPaths.p1dd38d80} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" />
    </Wrapper>
  );
}

function Button() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <Wrap />
      <LucideIcons3 />
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-center flex flex-wrap gap-[16px] items-center relative shrink-0 w-full" data-name="Buttons">
      <Button />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <MainContent />
      <Buttons />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative w-full">
          <Top />
          <Content4 />
        </div>
      </div>
    </div>
  );
}

function AccomodationItem() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-[320px] relative rounded-[6px] shrink-0" data-name="Accomodation Item">
      <div className="content-stretch flex flex-col gap-[8px] items-start min-w-[inherit] overflow-clip relative rounded-[inherit] w-full">
        <AvatarImage />
        <Main />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-1px] pointer-events-none rounded-[7px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Events() {
  return (
    <div className="content-center flex flex-wrap gap-[32px] items-center justify-center relative shrink-0 w-full" data-name="Events">
      {[...Array(3).keys()].map((_, i) => (
        <AccomodationItem key={i} />
      ))}
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Section">
      <DropdownText text="Recommended Hotels" />
      <Events />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#0ea5e9] content-stretch flex gap-[4px] items-center justify-center min-w-[80px] overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button 02">
      <WrapText text="View Options" />
      <LucideIcons4 />
    </div>
  );
}

function CardBaseFooter() {
  return (
    <CardBaseFooter2>
      <Button2 />
    </CardBaseFooter2>
  );
}

function AccomodationSearchItem() {
  return (
    <AccomodationSearchItem2>
      <AvatarImage />
      <CardBaseHeader text="Hotels near the Event" text1="Description" />
      <CardBaseFooter />
    </AccomodationSearchItem2>
  );
}

function Button1() {
  return (
    <div className="bg-[#0ea5e9] content-stretch flex gap-[4px] items-center justify-center min-w-[80px] overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button 02">
      <WrapText text="View Options" />
      <LucideIcons4 />
    </div>
  );
}

function CardBaseFooter1() {
  return (
    <CardBaseFooter2>
      <Button1 />
    </CardBaseFooter2>
  );
}

function AccomodationSearchItem1() {
  return (
    <AccomodationSearchItem2>
      <AvatarImage />
      <CardBaseHeader text="Hotels near the Airport" text1="Description" />
      <CardBaseFooter1 />
    </AccomodationSearchItem2>
  );
}

function Events1() {
  return (
    <div className="content-center flex flex-wrap gap-[32px] items-center relative shrink-0 w-full" data-name="Events">
      <AccomodationSearchItem />
      <AccomodationSearchItem1 />
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Section">
      <DropdownText text="Find Hotels" />
      <Events1 />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Content">
      <Section />
      <Section1 />
    </div>
  );
}

export default function AccomodationBlock() {
  return (
    <div className="bg-white relative size-full" data-name="Accomodation Block">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[80px] items-center px-[64px] py-[112px] relative size-full">
          <SectionTitle />
          <Content5 />
        </div>
      </div>
    </div>
  );
}