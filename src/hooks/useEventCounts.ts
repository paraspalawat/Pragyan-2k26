import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useEventCounts() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const fetchCounts = async () => {
    const { data } = await supabase
      .from("registrations")
      .select("event_name");

    if (data) {
      const map: Record<string, number> = {};
      data.forEach((r) => {
        map[r.event_name] = (map[r.event_name] || 0) + 1;
      });
      setCounts(map);
    }
  };

  useEffect(() => {
    fetchCounts();

    const channel = supabase
      .channel("registrations-count")
      .on("postgres_changes", { event: "*", schema: "public", table: "registrations" }, () => {
        fetchCounts();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return counts;
}
