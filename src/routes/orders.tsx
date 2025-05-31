import { createFileRoute } from '@tanstack/react-router'
import { setSidebarMenuActive } from '@/lib/utils'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MainHeader } from '@/components/main-header'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select'
import { Button } from '@/components/ui/button'
import z from 'zod'
import { QueryOrdersDT } from '@/components/query-orders-dt'

export const Route = createFileRoute('/orders')({
  component: RouteComponent,
})

const multiSelectItems = [
  { key: 'id', label: 'ID' },
  { key: 'customerId', label: 'Customer ID' },
  { key: 'employeeId', label: 'Employee ID' },
  { key: 'orderDate', label: 'Order Date' },
  { key: 'requiredDate', label: 'Required Date' },
  { key: 'shippedDate', label: 'Shipped Date' },
  { key: 'shipVia', label: 'Ship Via' },
  { key: 'freight', label: 'Freight' },
  { key: 'shipName', label: 'Ship Name' },
  { key: 'shipAddress', label: 'Ship Address' },
  { key: 'shipCity', label: 'Ship City' },
  { key: 'shipRegion', label: 'Ship Region' },
  { key: 'shipPostalCode', label: 'Ship Postal Code' },
  { key: 'shipCountry', label: 'Ship Country' },
]

function RouteComponent() {
  setSidebarMenuActive('/orders')

  const formSchema = z.object({
    freight: z.number(),
    skip: z.number().optional(),
    take: z.number().optional(),
    orderBy: z.array(z.string()).optional(),
    orderByDesc: z.array(z.string()).optional(),
    include: z.array(z.string()).optional(),
    fields: z.array(z.string()).optional(),
  })

  const [queryParams, setQueryParams] = useState<z.infer<typeof formSchema>>()
  const [selectedFields, setSelectedFields] = useState<Array<string>>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderBy: [],
      orderByDesc: [],
      include: [],
      fields: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setQueryParams(values)
    setSelectedFields(values.fields || [])
  }

  return (
    <>
      <MainHeader text="Orders" />
      <div className="@container flex flex-1 flex-col p-4 gap-6">
        <Card className="@container">
          <CardHeader>
            <CardTitle>Order not found?</CardTitle>
            <CardDescription>
              Fill in the order details below so we can assist you further.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="freight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Freight</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Additional Filters
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="skip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skip</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="take"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Take</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="orderBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order By</FormLabel>
                        <FormControl>
                          <MultiSelector
                            onValuesChange={field.onChange}
                            values={field.value || []}
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select columns" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList>
                                {multiSelectItems.map((multiSelectItem) => (
                                  <MultiSelectorItem
                                    key={multiSelectItem.key}
                                    value={multiSelectItem.key}
                                  >
                                    {multiSelectItem.label}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="orderByDesc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order By Desc</FormLabel>
                        <FormControl>
                          <MultiSelector
                            onValuesChange={field.onChange}
                            values={field.value || []}
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select columns" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList>
                                {multiSelectItems.map((multiSelectItem) => (
                                  <MultiSelectorItem
                                    key={multiSelectItem.key}
                                    value={multiSelectItem.key}
                                  >
                                    {multiSelectItem.label}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="include"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Include</FormLabel>
                        <FormControl>
                          <MultiSelector
                            onValuesChange={field.onChange}
                            values={field.value || []}
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select metadata" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList>
                                <MultiSelectorItem key="total" value="total">
                                  Total
                                </MultiSelectorItem>
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fields"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fields</FormLabel>
                        <FormControl>
                          <MultiSelector
                            onValuesChange={field.onChange}
                            values={field.value || []}
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select columns" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList>
                                {multiSelectItems.map((multiSelectItem) => (
                                  <MultiSelectorItem
                                    key={multiSelectItem.key}
                                    value={multiSelectItem.key}
                                  >
                                    {multiSelectItem.label}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </Form>
          </CardContent>
          <CardFooter>
            <Button onClick={form.handleSubmit(onSubmit)}>Query</Button>
          </CardFooter>
        </Card>

        {queryParams && (
          <QueryOrdersDT params={queryParams} fields={selectedFields} />
        )}
      </div>
    </>
  )
}
