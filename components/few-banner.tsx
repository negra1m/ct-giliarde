export default function FewBanner() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex h-[34px] items-center justify-center border-t border-white/10 bg-black/85 backdrop-blur-md">
      <a
        href="https://fewcompany.com?client=ct-giliarde"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Quer um site incrível como esse? Fale com a Few Company — abre em nova aba"
        className="group flex h-full w-full items-center justify-center px-4"
      >
        <span className="motion-reduce:transition-none hidden whitespace-nowrap text-[0.72rem] tracking-wide text-gray-400 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#FF2ECC] group-hover:to-[#38B6FF] group-hover:bg-clip-text group-hover:text-transparent sm:inline">
          Quer um site incrível como esse? Fale com a Few Company!
        </span>
        <span className="motion-reduce:transition-none inline whitespace-nowrap text-[0.68rem] tracking-wide text-gray-400 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#FF2ECC] group-hover:to-[#38B6FF] group-hover:bg-clip-text group-hover:text-transparent sm:hidden">
          Site feito pela Few Company →
        </span>
      </a>
    </div>
  )
}
