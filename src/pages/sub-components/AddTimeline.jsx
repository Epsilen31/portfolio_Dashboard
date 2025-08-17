import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import SpecialLoadingButton from "./SpecialLoadingButton"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { X, Plus } from "lucide-react"
import {
  addNewTimeline,
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimeline
} from "@/store/slices/timelineSlice"

const AddTimeline = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("fulltime")
  const [achievements, setAchievements] = useState([""])
  const [skills, setSkills] = useState([""])

  const { loading, error, message } = useSelector((state) => state.timeline)

  const dispatch = useDispatch()

  const addAchievement = () => {
    setAchievements([...achievements, ""])
  }

  const removeAchievement = (id) => {
    const newAchievements = achievements.filter(
      (achievement) => achievement.id !== id
    )
    setAchievements(newAchievements)
  }

  const updateAchievement = (index, value) => {
    const newAchievements = [...achievements]
    newAchievements[index] = value
    setAchievements(newAchievements)
  }

  const addSkill = () => {
    setSkills([...skills, ""])
  }

  const removeSkill = (id) => {
    const newSkills = skills.filter((skill) => skill.id !== id)
    setSkills(newSkills)
  }

  const updateSkill = (index, value) => {
    const newSkills = [...skills]
    newSkills[index] = value
    setSkills(newSkills)
  }

  const handleAddNewTimeline = (e) => {
    e.preventDefault()

    // Filter out empty achievements and skills
    const filteredAchievements = achievements.filter(
      (achievement) => achievement.trim() !== ""
    )
    const filteredSkills = skills.filter((skill) => skill.trim() !== "")

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("from", from)
    formData.append("to", to)
    formData.append("location", location)
    formData.append("type", type)
    formData.append("achievements", JSON.stringify(filteredAchievements))
    formData.append("skills", JSON.stringify(filteredSkills))

    dispatch(addNewTimeline(formData))
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setFrom("")
    setTo("")
    setLocation("")
    setType("fulltime")
    setAchievements([""])
    setSkills([""])
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllTimelineErrors())
    }
    if (message) {
      toast.success(message)
      resetForm()
      dispatch(resetTimeline())
      dispatch(getAllTimeline())
    }
  }, [dispatch, error, message])

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form
        className="w-[100%] px-5 md:w-[800px] max-h-screen overflow-y-auto"
        onSubmit={handleAddNewTimeline}
      >
        <div className="space-y-8">
          <div className="border-b border-gray-900/10 pb-8">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
              ADD A NEW TIMELINE
            </h2>
            <p className="text-center text-gray-600 mt-2">
              Create a comprehensive timeline entry with achievements and skills
            </p>
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>
                💡 <strong>Tips:</strong> Add your educational background, work
                experience, internships,
              </p>
              <p>
                and any other significant milestones in your career journey.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-gray-900"
              >
                Title *
              </Label>
              <Input
                id="title"
                type="text"
                className="mt-2"
                placeholder="e.g., Software Developer Intern"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-900"
              >
                Description *
              </Label>
              <Textarea
                id="description"
                className="mt-2"
                placeholder="Describe your role, responsibilities, and achievements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            {/* From Date */}
            <div>
              <Label
                htmlFor="from"
                className="text-sm font-medium text-gray-900"
              >
                From Date *
              </Label>
              <Input
                id="from"
                type="text"
                className="mt-2"
                placeholder="e.g., January 2025 or 2021"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>

            {/* To Date */}
            <div>
              <Label htmlFor="to" className="text-sm font-medium text-gray-900">
                To Date
              </Label>
              <Input
                id="to"
                type="text"
                className="mt-2"
                placeholder="e.g., June 2025 or Present (leave empty for current)"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <Label
                htmlFor="location"
                className="text-sm font-medium text-gray-900"
              >
                Location
              </Label>
              <Input
                id="location"
                type="text"
                className="mt-2"
                placeholder="e.g., Company Name or University"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Type */}
            <div>
              <Label
                htmlFor="type"
                className="text-sm font-medium text-gray-900"
              >
                Type
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="fulltime">Full Time</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium text-gray-900">
                Key Achievements
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAchievement}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Achievement
              </Button>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Enter achievement..."
                    value={achievement}
                    onChange={(e) => updateAchievement(index, e.target.value)}
                  />
                  {achievements.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAchievement(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium text-gray-900">
                Skills Applied
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSkill}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </Button>
            </div>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Enter skill..."
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                  />
                  {skills.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSkill(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-x-6">
          {!loading ? (
            <Button type="submit" className="w-full">
              Add Timeline
            </Button>
          ) : (
            <SpecialLoadingButton content={"Adding New Timeline"} />
          )}
        </div>
      </form>
    </div>
  )
}

export default AddTimeline
