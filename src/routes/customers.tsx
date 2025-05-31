import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { setSidebarMenuActive } from '@/lib/utils'
import { MainHeader } from '@/components/main-header'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TagsInput } from '@/components/ui/tags-input'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select'
import { useState } from 'react'
import { QueryCustomersDT } from '@/components/query-customers-dt'

export const Route = createFileRoute('/customers')({
  component: RouteComponent,
})

const multiSelectItems = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'companyName',
    label: 'Company Name',
  },
  {
    key: 'contactName',
    label: 'Contact Name',
  },
  {
    key: 'contactTitle',
    label: 'Contact Title',
  },
  {
    key: 'address',
    label: 'Address',
  },
  {
    key: 'city',
    label: 'City',
  },
  {
    key: 'region',
    label: 'Region',
  },
  {
    key: 'postalCode',
    label: 'Postal Code',
  },
  {
    key: 'country',
    label: 'Country',
  },
  {
    key: 'phone',
    label: 'Phone',
  },
  {
    key: 'fax',
    label: 'Fax',
  },
]

function RouteComponent() {
  setSidebarMenuActive('/customers')

  const formSchema = z.object({
    ids: z.array(z.string()),
    countryStartsWith: z.string(),
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
      ids: [],
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
      <MainHeader text="Customers" />
      <div className="@container flex flex-1 flex-col p-4 gap-6">
        <Card className="@container">
          <CardHeader>
            <CardTitle>Customer not found?</CardTitle>
            <CardDescription>
              Fill in the customer details below so we can assist you further.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="ids"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IDs</FormLabel>
                      <FormControl>
                        <TagsInput
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Customer IDs"
                        />
                      </FormControl>
                      <FormDescription>
                        Press <kbd>Enter</kbd> after each ID.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="countryStartsWith"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country Starts With</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Country starts with (e.x Ger, Ita, ...)"
                          {...field}
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
          <>
            <QueryCustomersDT params={queryParams} fields={selectedFields} />
          </>
        )}
      </div>
    </>
  )
}
