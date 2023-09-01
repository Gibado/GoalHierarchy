# Intro
There are goals we have in life (some of them are called dreams) and you must make actions to reach those goals.  "There's always a reason behind every action."

# GoalHierarchy
Single page site to help prioritize and identify which actions should be taken 1st based on the goals that are defined

# How to Use
1. Define some goals
	- Spend some time dreaming
2. Organize your goals
	- Any of the goals that support reaching another goal is a child of that goal
3. Define actions for each goal
	1. Each goal needs at least 1 action item or 1 child goal to reach that goal
4. Prioritize each goal layer against it's children based on how much it will help achieve the parent goal
	1. Prioritize top goal layer
	2. Prioritize each child goal base on it's siblings
	- These priority levels will be used to give each goal a weight that affect the action item score below them
	- These weights are based on percentage
		- Weight function: (priority level)/count
	- Weight is applied to each node with at least once sibling goal
5. Now the hard part: Prioritize the full action item list against each bottom goal base on how much it will help achieve that goal
	- This is to find synergy
	- The priority level of each action is weighted by the goal and then summarized
6. Now the Action Items have a cross-goal hierarchy

# Roadmap
1. Have the functionality to perform all 6 steps
    1. ~~Define some goals~~
    2. Organize your goals
    3. Define actions for each goal
    4. Prioritize each goal layer against it's children based on how much it will help achieve the parent goal
    5. Prioritize the full action item list against each bottom goal base on how much it will help achieve that goal
    6. Now the Action Items have a cross-goal hierarchy
2. Can save state between sessions
3. Beautify the interface
