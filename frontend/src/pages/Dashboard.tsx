import { useEffect, useState } from "react";
import api from "@/services/Axios";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Analytics {
    total: number;
    converted: number;
    byStatus: Record<string, number>;
}

const Dashboard = () => {
    const [data, setData] = useState<Analytics | null>(null);

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case "converted":
                return "text-green-600";
            case "qualified":
                return "text-blue-600";
            case "contacted":
                return "text-yellow-600";
            case "new":
                return "text-slate-600";
            default:
                return "text-muted-foreground";
        }
    };


    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get("/leads/analytics");
                console.log(res.data);
                setData({
                    total: res.data.totalLeads ?? 0,
                    converted: res.data.convertedLeads ?? 0,
                    byStatus: res.data.leadsByStatus ?? {},
                });
            } catch (error) {
                console.error("Failed to fetch analytics data", error);
            }
        };

        fetchAnalytics();
    }, []);

    if (!data) return <div>Loading dashboard...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">Dashboard</h1>

            {/* Top metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Leads</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                        {data.total}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Converted Leads</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold text-green-600">
                        {data.converted}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Conversion Rate</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                        {data.total > 0
                            ? Math.round((data.converted / data.total) * 100)
                            : 0}
                        %
                    </CardContent>
                </Card>
            </div>

            {/* Leads by Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Leads by Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <CardContent className="space-y-3">
                        {Object.keys(data.byStatus).length === 0 ? (
                            <p className="text-muted-foreground text-sm">
                                No status data available
                            </p>
                        ) : (
                            Object.entries(data.byStatus).map(([status, count]) => (
                                <div
                                    key={status}
                                    className="flex items-center justify-between"
                                >
                                    <span
                                        className={`text-base font-medium capitalize ${getStatusStyle(
                                            status
                                        )}`}
                                    >
                                        {status}
                                    </span>

                                    <span className="text-lg font-semibold">
                                        {count}
                                    </span>
                                </div>
                            ))
                        )}
                    </CardContent>

                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
