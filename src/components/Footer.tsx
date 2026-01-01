import Image from 'next/image'
import Link from 'next/link'

export default function Footer({ data }: any) {
  if (!data) return null

  return (
    <footer className="w-full px-[30px] pb-[60px] md:pb-[120px]">
        <div className="mx-auto w-full bg-darkBlue py-20 rounded-[20px]">
            <div className="mx-auto max-w-[1280px]">

                {/* TOP GRID */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4 text-white">

                {/* LOGO */}
                <div className="flex justify-center md:justify-start">
                    {data.logo?.asset?.url && (
                    <Image
                        src={data.logo.asset.url}
                        alt="Beveez"
                        width={140}
                        height={40}
                        className="h-8 w-auto"
                    />
                    )}
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h4 className="mb-4 font-semibold text-center md:text-left">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-center md:text-left">
                    {data.quickLinks?.map((item: any, i: number) => (
                        <li key={i}>
                        <Link href={item.url} className="hover:text-darkOrange transition">
                            {item.label}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>

                {/* SERVICES */}
                <div>
                    <h4 className="mb-4 font-semibold text-center md:text-left">Services</h4>
                    <ul className="space-y-2 text-sm text-center md:text-left">
                        {data.services.map((item: any, i: number) => (
                            <li key={i}>
                            <a
                                href={item.url}
                                className="hover:text-darkOrange transition"
                            >
                                {item.label}
                            </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* LEGAL */}
                <div>
                    <h4 className="mb-4 font-semibold text-center md:text-left">Legal</h4>
                    <ul className="space-y-2 text-sm text-center md:text-left">
                    {data.legal?.map((item: any, i: number) => (
                        <li key={i}>
                        <Link href={item.url} className="hover:text-darkOrange transition">
                            {item.label}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>

                {/* DIVIDER */}
                <div className="my-10 h-px w-full bg-white/30" />

                {/* COPYRIGHT */}
                <p className="text-center text-sm text-white/70">
                {data.copyright}
                </p>

            </div>
        </div>
    </footer>
  )
}
