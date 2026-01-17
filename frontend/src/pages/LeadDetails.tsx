import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/services/Axios";
import { type Lead } from "@/types/lead";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStatusBadgeVariant } from "@/lib/statusBadge";

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLead = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/leads/${id}`);
      setLead(res.data);
    } catch (error) {
      console.error("Failed to fetch lead", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  if (loading) {
    return <div>Loading lead details...</div>;
  }

  if (!lead) {
    return <div>Lead not found</div>;
  }

  // ✅ FIX: compute badge ONCE here
  const badge = getStatusBadgeVariant(lead.status);

  return (
    <div className="space-y-4 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>

        <h1 className="text-xl font-semibold">Lead Details</h1>
      </div>

      {/* Lead Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{lead.name}</span>

            <Badge
              variant={badge.variant}
              className={badge.className}
            >
              {lead.status}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Email</p>
            <p>{lead.email}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Phone</p>
            <p>{lead.phone}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Company</p>
            <p>{lead.company}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Source</p>
            <p>{lead.source}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>
            <Badge
              variant={badge.variant}
              className={badge.className}
            >
              {lead.status}
            </Badge>
          </div>

          <div>
            <p className="text-muted-foreground">Created At</p>
            <p>{new Date(lead.createdAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadDetails;
