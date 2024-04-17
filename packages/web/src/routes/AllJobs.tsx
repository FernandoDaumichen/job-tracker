import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/AllJobs')({
  component: () => <div>Hello /AllJobs!</div>
})