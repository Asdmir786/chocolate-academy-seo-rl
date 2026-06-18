import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Download, Calendar } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getNewsletters } from "@/lib/cms"

export const dynamic = "force-dynamic"

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const getMonths = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const monthList: Array<{ month: string; year: number }> = []

  for (let i = 0; i <= currentMonth; i++) {
    monthList.push({ month: MONTH_NAMES[i], year: currentYear })
  }

  for (let i = currentMonth + 1; i < 12; i++) {
    monthList.push({ month: MONTH_NAMES[i], year: currentYear - 1 })
  }

  monthList.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year
    return MONTH_NAMES.indexOf(b.month) - MONTH_NAMES.indexOf(a.month)
  })

  return monthList
}

export default async function NewsletterPage() {
  const newsletters = await getNewsletters(true)
  const availablePdfs: Record<string, { path: string; downloadName: string }> = {}

  for (const n of newsletters) {
    availablePdfs[`${n.month}-${n.year}`] = {
      path: `/api/newsletters/${n.id}/download`,
      downloadName: n.download_name || `CA-Journal-${n.month}-${n.year}.pdf`,
    }
  }

  const months = getMonths()
  const latestKey =
    Object.keys(availablePdfs).sort((a, b) => {
      const [aMonth, aYear] = a.split("-")
      const [bMonth, bYear] = b.split("-")
      if (Number(bYear) !== Number(aYear)) return Number(bYear) - Number(aYear)
      return MONTH_NAMES.indexOf(bMonth) - MONTH_NAMES.indexOf(aMonth)
    })[0] ?? null

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <section className="relative h-[250px] sm:h-[300px] overflow-hidden">
        <Image
          src="/images/Our-Gallery.jpg"
          alt="Chocolate Academy Newsletter"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Newsletter Archive</h1>
          <div className="flex items-center text-xs sm:text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 mx-1 sm:mx-2" />
            <span className="text-amber-400">Newsletter</span>
          </div>
        </div>
        <div className="absolute -bottom-3 left-0 w-full overflow-hidden h-3">
          <div
            className="w-full h-12"
            style={{
              backgroundImage: "url('/images/chocolate-drip.png')",
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
            }}
          ></div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-[#3c2415]">Monthly Newsletters</h2>
            <p className="text-base sm:text-lg text-[#5a3a28] max-w-2xl mx-auto px-2">
              Download our monthly newsletters to stay updated with the latest recipes, tips, events, and news from
              Chocolate Academy Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {months.map(({ month, year }) => {
              const key = `${month}-${year}`
              const pdf = availablePdfs[key]
              const isAvailable = Boolean(pdf)
              const isLatest = key === latestKey

              const innerContent = (
                <>
                  {isLatest && (
                    <div className="absolute top-3 right-[-28px] z-20 rotate-45 bg-amber-500 text-white text-[10px] font-bold px-8 py-0.5 shadow-sm tracking-wider uppercase">
                      New
                    </div>
                  )}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: "url('/images/chocolate-pattern.png')",
                        backgroundSize: "100px",
                        backgroundRepeat: "repeat",
                      }}
                    />
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <Calendar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#3c2415] mb-2 sm:mb-3 group-hover:text-amber-600 transition-colors" />
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#3c2415] mb-1 group-hover:text-amber-600 transition-colors text-center">
                      {month}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5a3a28] mb-2 sm:mb-3 md:mb-4">{year}</p>
                    <div className="flex items-center text-[#3c2415] group-hover:text-amber-600 transition-colors">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm font-medium">Download</span>
                    </div>
                  </div>

                  {isAvailable && (
                    <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-[#3c2415] to-transparent group-hover:h-full transition-all duration-300 opacity-10" />
                  )}
                </>
              )

              const baseClasses =
                "group relative bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-md transition-all duration-300 border-2 overflow-hidden block"

              if (isAvailable && pdf) {
                return (
                  <a
                    key={key}
                    href={pdf.path}
                    download={pdf.downloadName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${baseClasses} hover:shadow-xl border-transparent hover:border-amber-400 active:scale-95 cursor-pointer`}
                  >
                    {innerContent}
                  </a>
                )
              }

              return (
                <div key={key} aria-disabled="true" className={`${baseClasses} opacity-50 cursor-not-allowed`}>
                  {innerContent}
                </div>
              )
            })}
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 max-w-2xl mx-auto bg-amber-50 border-l-4 border-amber-400 p-4 sm:p-5 md:p-6 rounded-r-lg">
            <p className="text-sm sm:text-base text-[#3c2415]">
              <strong className="text-amber-600">Note:</strong> New newsletters are added monthly. If you don&apos;t see
              a specific month&apos;s newsletter, it may not be available yet. Check back soon!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
