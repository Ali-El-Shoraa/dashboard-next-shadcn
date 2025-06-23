"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  // BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";

export default function HeaderDirect() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const label = segment
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");

    return { href, label };
  });

  return (
    <Breadcrumb className="my-3">
      <BreadcrumbList className="text-lg font-bold">
        <BreadcrumbItem>
          <Link href={`/`}>Dashboard</Link>
          {/* <BreadcrumbLink href="/">Dashboard</BreadcrumbLink> */}
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <Fragment key={crumb.href}>
              <BreadcrumbItem className="text-lg font-bold">
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <Link href={crumb.href}>{crumb.label}</Link>
                  // <BreadcrumbLink href={crumb.href}>
                  //   {crumb.label}
                  // </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// "use client";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { usePathname } from "next/navigation";

// export default function HederDirect() {
//   const pathname = usePathname();
//   console.log("====================================");
//   console.log(pathname);
//   console.log("====================================");
//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
//         </BreadcrumbItem>

//         <BreadcrumbSeparator />

//         <BreadcrumbItem>

//           <BreadcrumbLink href="/components">Users</BreadcrumbLink>

//         </BreadcrumbItem>

//         <BreadcrumbSeparator />

//         <BreadcrumbItem>
//           <BreadcrumbPage>Ali El-Shoraa</BreadcrumbPage>
//         </BreadcrumbItem>

//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }
