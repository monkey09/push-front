import { Card, Skeleton } from "@mantine/core"

const TodosSkeleton = () => {
  return (
    <Card withBorder>
      <Skeleton height={20} width="20%" mb="md" />
      <Skeleton height={20} width="80%" />
    </Card>
  )
}

export default TodosSkeleton