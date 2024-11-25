import React from 'react';
import {
    Box,
    Paper,
    Typography,
    useTheme
} from '@mui/material';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import { format } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2">
                    {format(new Date(label), 'MMM dd, yyyy')}
                </Typography>
                {payload.map((entry, index) => (
                    <Box key={index} sx={{ color: entry.color }}>
                        <Typography variant="body2">
                            {entry.name}: {entry.value}
                        </Typography>
                    </Box>
                ))}
            </Paper>
        );
    }
    return null;
};

const WorkoutProgressChart = ({ data, metric = 'weight' }) => {
    const theme = useTheme();

    const formatData = () => {
        return data.map(entry => ({
            date: new Date(entry.date).getTime(),
            [metric]: entry.value
        }));
    };

    const getYAxisLabel = () => {
        switch (metric) {
            case 'weight':
                return 'Weight (lbs)';
            case 'reps':
                return 'Repetitions';
            case 'sets':
                return 'Sets';
            case 'duration':
                return 'Duration (min)';
            default:
                return '';
        }
    };

    const formattedData = formatData();

    return (
        <Box sx={{ width: '100%', height: 400, p: 2 }}>
            <ResponsiveContainer>
                <LineChart
                    data={formattedData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        type="number"
                        domain={['auto', 'auto']}
                        tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM dd')}
                    />
                    <YAxis
                        label={{
                            value: getYAxisLabel(),
                            angle: -90,
                            position: 'insideLeft',
                            style: { textAnchor: 'middle' }
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey={metric}
                        stroke={theme.palette.primary.main}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default WorkoutProgressChart;
