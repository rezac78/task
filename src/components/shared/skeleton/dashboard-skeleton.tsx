import {Skeleton} from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
   <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center space-y-4">
    <Skeleton className="w-24 h-24 rounded-full mx-auto" />
    <Skeleton className="h-6 w-1/2 mx-auto" />
    <Skeleton className="h-4 w-2/3 mx-auto" />
    <Skeleton className="h-4 w-2/4 mx-auto" />
    <Skeleton className="h-10 w-full" />
   </div>
  </div>
 );
}
