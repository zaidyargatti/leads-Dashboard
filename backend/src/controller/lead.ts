import { type Request, type Response } from "express";
import { Lead } from "../models/lead";

export const getLeads = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      search = "",
      status,
      source,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const query: any = {};

    // 🔍 Search (name, email, company)
    if (search) {
      query.$text = { $search: search as string };
    }

    // 🎯 Filters
    if (status) query.status = status;
    if (source) query.source = source;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const leads = await Lead.find(query)
      .sort({ [sort as string]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      data: leads,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch leads", error });
  }
};


export const getLeadById = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(lead);
  } catch (error) {
        console.log(error);
    res.status(500).json({ message: "Failed to fetch lead", error });
  }
};


export const getLeadAnalytics = async (_: Request, res: Response) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({
      status: "Converted",
    });

    const leadsByStatus = await Lead.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusBreakdown: Record<string, number> = {};
    leadsByStatus.forEach((item) => {
      statusBreakdown[item._id] = item.count;
    });
    
    res.status(200).json({
      totalLeads,
      convertedLeads,
      leadsByStatus: statusBreakdown,
    });
  } catch (error) {
        console.log(error);
    res.status(500).json({ message: "Failed to fetch analytics", error });
  }
};
