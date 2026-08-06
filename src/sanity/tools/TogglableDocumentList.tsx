"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Card, Flex, Stack, Switch, Text } from "@sanity/ui";
import { useClient } from "sanity";
import { usePaneRouter } from "sanity/structure";
import { apiVersion } from "../env";

type Item = {
  _id: string;
  label: string;
  isActive: boolean | null;
};

type Props = {
  options: {
    docType: string;
    titleField: string;
  };
};

export function TogglableDocumentList({ options }: Props) {
  const { docType, titleField } = options;
  const rawClient = useClient({ apiVersion });
  const client = useMemo(() => rawClient.withConfig({ perspective: "raw" }), [rawClient]);
  const { ChildLink } = usePaneRouter();

  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    const query = `*[_type == $docType && !(_id in path("drafts.**"))] | order(${titleField} asc) {_id, "label": ${titleField}, isActive}`;
    client
      .fetch<Item[]>(query, { docType })
      .then((result) => {
        setItems(result);
        setError(null);
      })
      .catch((err) => {
        console.error("TogglableDocumentList load error:", err);
        setError("Không tải được danh sách. Vui lòng thử lại.");
      });
  }, [client, docType, titleField]);

  useEffect(() => {
    load();
  }, [load]);

  const handleToggle = useCallback(
    async (item: Item) => {
      const nextActive = !(item.isActive !== false);

      setItems((prev) =>
        prev
          ? prev.map((it) => (it._id === item._id ? { ...it, isActive: nextActive } : it))
          : prev
      );

      try {
        await client.patch(item._id).set({ isActive: nextActive }).commit();
      } catch (err) {
        console.error("TogglableDocumentList toggle error:", err);
        setItems((prev) =>
          prev
            ? prev.map((it) => (it._id === item._id ? { ...it, isActive: item.isActive } : it))
            : prev
        );
      }
    },
    [client]
  );

  if (error) {
    return (
      <Box padding={4}>
        <Text size={1} tone="critical">
          {error}
        </Text>
      </Box>
    );
  }

  if (!items) {
    return (
      <Box padding={4}>
        <Text size={1} muted>
          Đang tải...
        </Text>
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box padding={4}>
        <Text size={1} muted>
          Chưa có dữ liệu.
        </Text>
      </Box>
    );
  }

  return (
    <Box padding={2}>
      <Stack space={1}>
        {items.map((item) => {
          const active = item.isActive !== false;
          return (
            <Card key={item._id} radius={2} padding={2} tone={active ? "default" : "transparent"}>
              <Flex align="center" justify="space-between">
                <Box flex={1}>
                  <ChildLink childId={item._id} style={{ textDecoration: "none" }}>
                    <Text size={1} muted={!active}>
                      {item.label || "(Không có tên)"}
                    </Text>
                  </ChildLink>
                </Box>
                <Flex align="center" gap={2}>
                  <Text size={1} muted={!active}>
                    {active ? "Đang hiện" : "Đang ẩn"}
                  </Text>
                  <Switch
                    checked={active}
                    onChange={() => handleToggle(item)}
                  />
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
