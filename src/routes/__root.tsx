import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createRootRoute({
	component: Root,
});

export default function Root() {
	return (
		<div className="subpixel-antialiased">
			{" "}
			<SidebarProvider
				style={
					{
						"--sidebar-width": "350px",
					} as React.CSSProperties
				}
			>
				<AppSidebar />
				<SidebarInset>
					<header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">Home</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Journal</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4">
						<Outlet />
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
