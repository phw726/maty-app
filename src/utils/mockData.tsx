import {CalendarDataType, Schedule, ScheduleColor} from './type'

export const mockCalendarData: CalendarDataType = {
	'2025-03-30': {
		diary: {content: '오늘은 운동을 했다.'},
		todos: [
			{id: '1', content: 'React Native 복습하기', isComplete: true},
			{id: '2', content: '정처기 이론 정리', isComplete: false}
		],
		schedule: [
			{
				id: '1',
				content: '스터디 모임',
				startDate: '2025-04-03',
				endDate: '2025-04-03',
				startTime: '14:00',
				endTime: '16:00',
				isAllDay: false,
				color: ScheduleColor.BLUE
			},
			{
				id: '2',
				content: '은행가기기',
				startDate: '2025-04-03',
				endDate: '2025-04-03',
				isAllDay: true,
				color: ScheduleColor.CYAN
			}
		]
	}
}

export const mockSchedules: Schedule[] = [
	{
		id: '1',
		content: '스터디 모임',
		startDate: '2025-04-04',
		endDate: '2025-04-04',
		isAllDay: true,
		color: ScheduleColor.BLUE
	},
	{
		id: '2',
		content: '디자인 회의',
		startDate: '2025-04-04',
		endDate: '2025-04-05',
		isAllDay: false,
		startTime: '10:00',
		endTime: '11:00',
		color: ScheduleColor.PURPLE
	},
	{
		id: '3',
		content: '개인 프로젝트',
		startDate: '2025-04-05',
		endDate: '2025-04-06',
		isAllDay: true,
		color: ScheduleColor.GREEN
	}
]
