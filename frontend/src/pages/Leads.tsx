import { useEffect, useState } from "react";
import api from "@/services/Axios";
import { type Lead } from "@/types/lead";
import { useNavigate } from "react-router-dom";
import { getStatusBadgeVariant } from "@/lib/statusBadge";


import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Leads = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const navigate = useNavigate();


    const fetchLeads = async () => {
        try {
            setLoading(true);
            const res = await api.get("/leads/all", {
                params: {
                    page,
                    limit,
                    search,
                    sortBy,
                    sortOrder,
                },
            });

            setLeads(res.data.data);
            setTotalPages(res.data.pagination.totalPages);
            setTotalRecords(res.data.pagination.total);
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [page, limit]);

    const handleSearch = () => {
        setPage(1);
        fetchLeads();
    };

    // Pagination info
    const startRecord = totalRecords === 0 ? 0 : (page - 1) * limit + 1;
    const endRecord = Math.min(page * limit, totalRecords);

    return (
        <div className="space-y-4">
            {/* Page Title */}


            {/* Card Wrapper */}
            <Card>
                {/* Card Header */}
                <CardHeader className="border-b">
                    <div className="flex items-center justify-between gap-4">
                        {/* LEFT: Title */}
                        <h1 className="text-xl font-semibold">Leads</h1>

                        {/* CENTER: Search */}
                        <div className="flex items-center gap-2 w-full max-w-md">
                            <Input
                                placeholder="Search by name, email, company"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Search</Button>
                        </div>

                        {/* RIGHT: Rows per page */}
                        <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                            <span>Show</span>
                            <Select
                                value={String(limit)}
                                onValueChange={(value) => {
                                    setLimit(Number(value));
                                    setPage(1);
                                }}
                            >
                                <SelectTrigger className="w-22.5">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                            <span>entries</span>
                        </div>
                    </div>
                </CardHeader>


                {/* Card Content */}
                <CardContent className="p-0">
                    <div className="border-t">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setSortBy("name");
                                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                        }}
                                    > Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Source</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6">
                                            Loading leads...
                                        </TableCell>
                                    </TableRow>
                                ) : leads.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6">
                                            No leads found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    leads.map((lead) => {
                                        const badge = getStatusBadgeVariant(lead.status);

                                        return (
                                            <TableRow
                                                key={lead._id}
                                                className="hover:bg-muted/50 cursor-pointer"
                                                onClick={() => navigate(`/leads/${lead._id}`)}
                                            >
                                                <TableCell className="font-medium">
                                                    {lead.name}
                                                </TableCell>

                                                <TableCell>{lead.company}</TableCell>
                                                <TableCell>{lead.email}</TableCell>

                                                <TableCell>
                                                    <Badge
                                                        variant={badge.variant}
                                                        className={badge.className}
                                                    >
                                                        {lead.status}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell>{lead.source}</TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex items-center justify-between p-4 border-t text-sm text-muted-foreground">
                        {/* Left info */}
                        <div>
                            {totalRecords > 0 ? (
                                <span>
                                    Showing <strong>{startRecord}</strong>–
                                    <strong>{endRecord}</strong> of{" "}
                                    <strong>{totalRecords}</strong> records
                                </span>
                            ) : (
                                <span>No records</span>
                            )}
                        </div>

                        {/* Right buttons */}
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                Previous
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === totalPages || totalRecords === 0}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Leads;
