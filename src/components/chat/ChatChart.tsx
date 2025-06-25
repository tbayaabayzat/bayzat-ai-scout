
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter, ResponsiveContainer } from 'recharts'
import { ChartData } from "@/types/chat"

interface ChatChartProps {
  data: ChartData
  onExport?: () => void
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C']

export function ChatChart({ data, onExport }: ChatChartProps) {
  const exportChart = () => {
    // Simple export - could be enhanced to export as image
    const chartData = JSON.stringify(data, null, 2)
    const blob = new Blob([chartData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'chart-data.json'
    a.click()
    URL.revokeObjectURL(url)
    onExport?.()
  }

  const renderChart = () => {
    switch (data.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="industry" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="automation" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        )
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#0088FE" />
            </LineChart>
          </ResponsiveContainer>
        )
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name="Employee Count" />
              <YAxis dataKey="y" name="Automation Score" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter dataKey="y" fill="#0088FE" />
            </ScatterChart>
          </ResponsiveContainer>
        )
      
      default:
        return <div className="text-center text-muted-foreground">Unsupported chart type</div>
    }
  }

  return (
    <div className="my-4 border rounded-lg bg-background">
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div>
          <h3 className="font-medium">{data.title}</h3>
          <p className="text-sm text-muted-foreground">
            {data.type.charAt(0).toUpperCase() + data.type.slice(1)} chart
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={exportChart}
        >
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>
      </div>
      
      <div className="p-4">
        {renderChart()}
      </div>
    </div>
  )
}
